const colors = [
  "#fc3903",
  "#f2b438",
  "#87c93a",
  "#3ac96e",
  "#3a60c9",
  "#633ac9",
  "#9c3ac9",
  "#c93abf",
];
const limit = colors.length;
const opt = ["confirmed", "recovered", "deaths"];
let genderCount = {
    M: 0,
    F: 0,
    "": 0,
  },
  countryList = {},
  globalEntireData,
  rawEntireData,
  selectedCountryList,
  chart1,
  chart2,
  chart3;
ageCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let canvas1 = document.getElementById("canvas1").getContext("2d"),
  canvas2 = document.getElementById("canvas2").getContext("2d"),
  canvas3 = document.getElementById("canvas3").getContext("2d");

let elems = document.querySelectorAll(".chips-autocomplete");
let instance = M.Chips.init(elems, {
  data: [
    { tag: "India" },
    { tag: "China" },
    { tag: "Spain" },
    { tag: "Italy" },
    { tag: "US" },
  ],
  autocompleteOptions: {
    data: countryList,
    limit: limit,
    minLength: 2,
  },
  onChipAdd: function () {
    if (instance[0].chipsData.length > limit) instance[0].deleteChip(0);
    plotCountryWiseChart(
      instance[0].chipsData,
      document.getElementById("my-select").value
    );
  },
  onChipDelete: function () {
    plotCountryWiseChart(
      instance[0].chipsData,
      document.getElementById("my-select").value
    );
  },
});

function readData() {
  fetch("https://api.covid19india.org/raw_data.json")
    .then((res) => res.json())
    .then(({ raw_data }) => {
      let age,
        ageNotDisclosed = 0;
      rawEntireData = raw_data;
      raw_data.forEach((element) => {
        genderCount[element.gender] += 1;
        age = Number(element.agebracket);
        if (element.agebracket == "") ageNotDisclosed += 1;
        else if (age > 100) ageCount[10] += 1;
        else if (age > 90) ageCount[9] += 1;
        else if (age > 80) ageCount[8] += 1;
        else if (age > 70) ageCount[7] += 1;
        else if (age > 60) ageCount[6] += 1;
        else if (age > 50) ageCount[5] += 1;
        else if (age > 40) ageCount[4] += 1;
        else if (age > 30) ageCount[3] += 1;
        else if (age > 20) ageCount[2] += 1;
        else if (age > 10) ageCount[1] += 1;
        else ageCount[0] += 1;
      });
      var config1 = {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [genderCount["M"], genderCount["F"]],
              backgroundColor: ["#eb54e877", "#6354eb77"],
              borderColor: ["#eb54e8ff", "#6354ebff"],
              borderWidth: [1, 1],
            },
          ],
          labels: ["Male", "Female"],
        },
        options: {
          responsive: true,
          legend: { position: "bottom" },
          title: { display: true, text: "Patients Count - GenderWise" },
          animation: { animateScale: true, animateRotate: true },
        },
      };
      let chart1 = new Chart(canvas1, config1);
      let config2 = {
        type: "bar",
        data: {
          labels: [
            "0-10",
            "10-20",
            "20-30",
            "30-40",
            "40-50",
            "50-60",
            "60-70",
            "70-80",
            "80-90",
            "90-100",
            "100+",
          ],
          datasets: [
            {
              label: `Patients`,
              backgroundColor: "#6354eb88",
              borderColor: "#6354ebff",
              borderWidth: 1,
              data: ageCount,
            },
          ],
        },
        options: {
          responsive: true,
          legend: { display: false },
          title: {
            display: true,
            text: `Patients Count - Agewise`,
            fontSize: 14,
          },
          tooltips: { mode: "index", intersect: false },
          hover: { mode: "nearest", intersect: true },
          scales: {
            xAxes: [{ ticks: { fontSize: 12 } }],
            yAxes: [
              {
                ticks: {
                  fontSize: 12,
                  callback: (value) =>
                    value > 800 ? String(value / 1000) + "k" : value,
                },
              },
            ],
          },
        },
      };
      let chart2 = new Chart(canvas2, config2);
      document.getElementById(
        "canvas1note"
      ).innerText = `Gender values unavailable for ${genderCount[""]} patients.`;
      document.getElementById(
        "canvas2note"
      ).innerText = `Age values unavailable for ${ageNotDisclosed} patients.`;
    })
    .then((res) => fetch("https://pomber.github.io/covid19/timeseries.json"))
    .catch((err) => fetch("Covid19/json/global.json"))
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("to-be-updated").innerHTML = "";
      Object.keys(data).forEach((element) => (countryList[element] = null));
      opt.forEach(
        (element) =>
          (document.getElementById(
            "my-select"
          ).innerHTML += `<option value="${element}">${
            element[0].toUpperCase() + element.slice(1)
          }</option>`)
      );
      globalEntireData = data;
      document.getElementById("my-select").value = "confirmed";
      $(document).ready(function () {
        $("select").formSelect();
      });
      plotCountryWiseChart(
        instance[0].chipsData,
        document.getElementById("my-select").value
      );
    });
}

function plotCountryWiseChart(countries, cat) {
  if (!countries.length) {
    chart3 = "";
  }
  if (chart3) {
    chart3.destroy();
  }
  if (window.screen.availWidth <= 650) size = 6;
  else size = 14;
  let datasets = [];
  let labels = [];
  globalEntireData["India"].forEach((el) =>
    labels.push(el["date"].split("-").reverse().join("-").slice(0, 4))
  );
  let i = 0;
  countries.forEach((country) => {
    let data = [];
    globalEntireData[country.tag].forEach((el) => data.push(el[cat]));
    datasets.push({
      label: country.tag,
      data: data,
      fill: false,
      backgroundColor: colors[i] + "ff",
      borderColor: colors[i] + "ff",
      pointRadius: 0,
    });
    i += 1;
  });
  let optionsLineChart = {
    type: "line",
    data: { labels, datasets: datasets },
    options: {
      responsive: true,
      legend: {
        display: false,
        position: "bottom",
        labels: { fontColor: "#222", fontSize: size },
      },
      title: {
        display: true,
        text: `Covid19 Cases Count`,
        fontSize: size + 4,
      },
      tooltips: { mode: "index", intersect: false },
      hover: { mode: "nearest", intersect: true },
      chartArea: { backgroundColor: "#223e8011" },
      scales: {
        xAxes: [{ gridLines: { display: false }, ticks: { fontSize: 9 } }],
        yAxes: [
          {
            gridLines: { display: false },
            ticks: {
              fontSize: 9,
              callback: (value) =>
                value > 999 ? String(value / 1000) + "k" : value,
            },
          },
        ],
      },
    },
  };
  if (size > 12) {
    optionsLineChart.options.legend.display = true;
    optionsLineChart.options.scales.xAxes = [
      {
        display: true,
        scaleLabel: { display: true, labelString: "Date" },
      },
    ];
    optionsLineChart.options.scales.yAxes = [
      {
        display: true,
        scaleLabel: { display: true, labelString: "Count " },
        ticks: {
          fontSize: 12,
          callback: (value) =>
            value > 800 ? String(value / 1000) + "k" : value,
        },
      },
    ];
  }
  chart3 = new Chart(canvas3, optionsLineChart);
}

function toggleCategory() {
  plotCountryWiseChart(
    instance[0].chipsData,
    document.getElementById("my-select").value
  );
}
