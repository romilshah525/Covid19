let chart3,
  total = 0,
  size = 16,
  statewise,
  rawEntireData,
  entireIndiaData,
  time_series_data,
  globalEntireData,
  selectedCountryList,
  temp = [],
  dates = [],
  dateLabel = [],
  countryList = {};

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

let canvas3 = document.getElementById("canvas3").getContext("2d");

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

function insertOptionList(data) {
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
  ).remove();
  plotCountryWiseChart(
    instance[0].chipsData,
    document.getElementById("my-select").value
  );
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
      borderWidth: size > 12 ? 3.5 : 1.5,
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

function readData() {
  fetch("https://pomber.github.io/covid19/timeseries.json")
    .catch((err) => fetch("Covid19/json/global.json"))
    .then((response) => response.json())
    .then((data) => insertOptionList(data));
}
