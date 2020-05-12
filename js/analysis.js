let chart1,
  chart2,
  chart3,
  chart4,
  total = 0,
  size = 16,
  growthFactor = 0,
  statewise,
  rawEntireData,
  entireIndiaData,
  time_series_data,
  globalEntireData,
  selectedCountryList,
  temp = [],
  dates = [],
  dateLabel = [],
  indiaTotalData = [],
  indiaWeeklyData = [],
  growthFactorArray = [],
  totalDataLogScale = [],
  weeklyDataLogScale = [],
  genderCount = {
    M: 0,
    F: 0,
    "": 0,
  },
  countryList = {},
  ageCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const colors = [
    "#fc3903",
    "#f2b438",
    "#87c93a",
    "#3ac96e",
    "#3a60c9",
    "#633ac9",
    "#9c3ac9",
    "#c93abf",
  ],
  limit = colors.length,
  opt = ["confirmed", "recovered", "deaths"];

let canvas1 = document.getElementById("canvas1").getContext("2d"),
  canvas2 = document.getElementById("canvas2").getContext("2d"),
  canvas3 = document.getElementById("canvas3").getContext("2d"),
  canvas4 = document.getElementById("canvas4").getContext("2d");

let chipsElems = document.querySelectorAll(".chips-autocomplete");
let instance = M.Chips.init(chipsElems, {
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
      chart1 = new Chart(canvas1, config1);
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
      chart2 = new Chart(canvas2, config2);
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
      document.getElementById(
        "last-updated"
      ).innerHTML = `<h6 class="black-text truncate center-align text-small"> Last updated 25th April </h6>`;
      plotCountryWiseChart(
        instance[0].chipsData,
        document.getElementById("my-select").value
      );
    })
    .then((res) => fetch("https://api.covid19india.org/data.json"))
    .catch((err) => fetch("Covid19/json/india.json"))
    .then((res) => res.json())
    .then((res) => {
      entireIndiaData = res;
      time_series_data = res.cases_time_series;
      statewise = res.statewise;
      time_series_data.forEach((a) => {
        indiaTotalData.push(Number(a["totalconfirmed"]));
        indiaWeeklyData.push(Number(a["dailyconfirmed"]));
        dates.push(a["date"]);
      });
      for (let index = 0; index < indiaWeeklyData.length; index += 7) {
        dateLabel.push(
          dates[Math.min(index + 7, indiaWeeklyData.length - 1)].slice(0, 6)
        );
        total = 0;
        temp = indiaWeeklyData.slice(index, index + 7);
        temp.forEach((t) => (total += t));
        weeklyDataLogScale.push(
          Math.log(total == 0 ? 1 : total).toLocaleString()
        );

        total = 0;
        temp = indiaTotalData.slice(index, index + 7);
        temp.forEach((t) => (total += t));
        totalDataLogScale.push(
          Math.log(total == 0 ? 1 : total).toLocaleString()
        );
      }
      let tempData = [];
      for (let index = 1; index < indiaWeeklyData.length - 1; index++) {
        if (indiaWeeklyData[index] == 0 || indiaWeeklyData[index - 1] == 0) {
          continue;
        } else {
          tempData.push(
            Math.abs(
              (indiaWeeklyData[index + 1] - indiaWeeklyData[index]) /
                (indiaWeeklyData[index] - indiaWeeklyData[index - 1])
            )
          );
        }
      }
      let tempTotal = 0;
      tempData.forEach((el) => {
        if (el != "Infinity") tempTotal += el;
      });
      document.getElementById("growth-factor").innerText = (
        tempTotal / tempData.length
      ).toLocaleString();
      weeklyLogScaleCountPlot();
    });
}

function plotCountryWiseChart(countries, cat) {
  if (chart3) {
    chart3.destroy();
  }
  if (!countries.length) {
    chart3 = "";
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
        text: `Covid19 ${cat[0].toUpperCase() + cat.slice(1)} Cases Count`,
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
              type: "linear",
              fontSize: 9,
              callback: (value) =>
                value > 99000
                  ? String(value / 100000) + "M"
                  : value > 800
                  ? String(value / 1000) + "K"
                  : value,
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
            value > 80000
              ? String(value / 100000) + "M"
              : value > 800
              ? String(value / 1000) + "K"
              : value,
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

function weeklyLogScaleCountPlot() {
  let config4 = {
    data: {
      labels: dateLabel,
      datasets: [
        {
          label: "Confirmed",
          data: weeklyDataLogScale,
          fill: false,
          backgroundColor: "#223e80ff",
          borderColor: "#223e80ff",
          pointRadius: 1,
        },
      ],
    },
    type: "line",
    options: {
      responsive: true,
      legend: {
        display: false,
        position: "bottom",
        labels: { fontColor: "#222", fontSize: size },
      },
      title: {
        display: true,
        text: `Covid19 Weekly Count vs Total Count (Log Scale)`,
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
            ticks: { fontSize: 9 },
          },
        ],
      },
    },
  };
  if (size > 12) {
    config4.options.legend.display = true;
    config4.options.scales.xAxes = [
      {
        display: true,
        scaleLabel: { display: true, labelString: "Date" },
      },
    ];
    config4.options.scales.yAxes = [
      {
        display: true,
        scaleLabel: { display: true, labelString: "Count " },
        ticks: { fontSize: 12 },
      },
    ];
  }
  chart4 = new Chart(canvas4, config4);
}

// // no.of cases per day delayed by 15 days
// // mortality rate
// // infection to day count
// // SIR Model
