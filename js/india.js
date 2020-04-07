let entireData,
  state_district_wise,
  state_daily,
  time_series_data,
  statewise,
  totalActiveCovidOrg,
  totalConfirmedCovidOrg,
  totalDeathsCovidOrg,
  totalReceoveredCovidOrg;

const ctx11 = document.getElementById("myChart11").getContext("2d"),
  ctx12 = document.getElementById("myChart12").getContext("2d"),
  ctx13 = document.getElementById("myChart13").getContext("2d"),
  ctx14 = document.getElementById("myChart14").getContext("2d");

let country = "India";

function readData() {
  fetch("https://api.covid19india.org/data.json")
    // .catch(fetch("Covid19/india.json"))
    .then((res) => res.json())
    .then((res) => {
      entireData = res;
      statewise = res.statewise;
      time_series_data = res.cases_time_series;
      printSummary();
      plotGraph((data = time_series_data), (size = 20));
    });
}

function plotGraph(data = time_series_data, size = 12) {
  let confirmed = [],
    deceased = [],
    active = [],
    recovered = [],
    date = [];
  console.log(window.screen.availWidth);
  console.log(window.screen.availHeight);
  data.forEach((element) => {
    date.push(element["date"].slice(0, 6));
    confirmed.push(Number(element["dailyconfirmed"]));
    deceased.push(Number(element["dailydeceased"]));
    recovered.push(Number(element["dailyrecovered"]));
    active.push(
      Number(element["dailyconfirmed"]) -
        (Number(element["dailyrecovered"]) + Number(element["dailydeceased"]))
    );
  });
  myChart11 = new Chart(ctx11, {
    type: "line",
    data: {
      labels: date,
      datasets: [
        {
          label: "Confirmed ",
          data: confirmed,
          fill: false,
          backgroundColor: "#223e80ff",
          borderColor: "#223e80ff",
        },
      ],
    },
    options: {
      responsive: true,
      legend: {
        position: "bottom",
        labels: { fontColor: "#223e80ff", fontSize: size },
      },
      title: {
        display: true,
        text: `Covid19 Confirmed Daily Count - India`,
        fontSize: size + 4,
      },
      tooltips: { mode: "index", intersect: false },
      hover: { mode: "nearest", intersect: true },
      responsive: true,
      chartArea: { backgroundColor: "#223e8011" },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: { display: false, labelString: "Date" },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: { display: true, labelString: "Confirmed Count " },
          },
        ],
      },
    },
  });
  myChart12 = new Chart(ctx12, {
    type: "line",
    data: {
      labels: date,
      datasets: [
        {
          label: "Active ",
          data: active,
          fill: true,
          backgroundColor: "#e82727a0",
          hoverBorderColor: "#e82727ff",
          borderColor: "#e82727ff",
        },
      ],
    },
    options: {
      responsive: true,
      legend: { position: "bottom", labels: { fontColor: "#e82727ff" } },
      title: {
        display: true,
        text: `Covid19 Active Daily Count - India`,
      },
      tooltips: { mode: "index", intersect: false },
      hover: { mode: "nearest", intersect: true },
      responsive: true,
      chartArea: { backgroundColor: "#e8272711" },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: { display: true, labelString: "Date" },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: { display: true, labelString: "Active Count " },
          },
        ],
      },
    },
  });
  myChart13 = new Chart(ctx13, {
    type: "line",
    data: {
      labels: date,
      datasets: [
        {
          label: "Recovered ",
          data: recovered,
          fill: true,
          backgroundColor: "#2adb2aa0",
          hoverBorderColor: "#2adb2aff",
          borderColor: "#2adb2aff",
        },
      ],
    },
    options: {
      responsive: true,
      legend: { position: "bottom", labels: { fontColor: "#34bf34ff" } },
      title: {
        display: true,
        text: `Covid19 Recovered Daily Count - India`,
      },
      tooltips: { mode: "index", intersect: false },
      hover: { mode: "nearest", intersect: true },
      responsive: true,
      chartArea: { backgroundColor: "#2adb2a11" },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: { display: true, labelString: "Date" },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: { display: true, labelString: "Recovered Count " },
          },
        ],
      },
    },
  });
  myChart14 = new Chart(ctx14, {
    type: "line",
    data: {
      labels: date,
      datasets: [
        {
          label: "Deaths ",
          data: deceased,
          fill: true,
          backgroundColor: "#8f8c8ca0",
          hoverBorderColor: "#8f8c8cff",
          borderColor: "#8f8c8cf0",
        },
      ],
    },
    options: {
      responsive: true,
      legend: { position: "bottom", labels: { fontColor: "#8f8c8cff" } },
      title: {
        display: true,
        text: `Covid19 Death Daily Count - India`,
      },
      tooltips: { mode: "index", intersect: false },
      hover: { mode: "nearest", intersect: true },
      responsive: true,
      chartArea: { backgroundColor: "#8f8c8c10" },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: { display: true, labelString: "Date" },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: { display: true, labelString: "Deaths Count " },
          },
        ],
      },
    },
  });
}

function printSummary() {
  element = statewise[0];
  total = element.confirmed;
  totalActiveCovidOrg = element.active;
  totalConfirmedCovidOrg = element.confirmed;
  totalDeathsCovidOrg = element.deaths;
  totalReceoveredCovidOrg = element.recovered;
  document.getElementById(
    "total-confirmed-cases"
  ).innerText = `Positives: ${totalConfirmedCovidOrg}`;
  document.getElementById(
    "total-recovered-cases"
  ).innerText = `Recoveries: ${totalReceoveredCovidOrg}`;
  document.getElementById(
    "total-active-cases"
  ).innerText = `Active: ${totalActiveCovidOrg}`;
  document.getElementById(
    "total-death-cases"
  ).innerText = `Deaths: ${totalDeathsCovidOrg}`;
  document.getElementById("recovery-rate").innerText = `Recovery Rate: ${String(
    (totalReceoveredCovidOrg / totalConfirmedCovidOrg) * 100
  ).slice(0, 5)}%`;
  document.getElementById("death-rate").innerText = `Death Rate: ${String(
    (totalDeathsCovidOrg / totalConfirmedCovidOrg) * 100
  ).slice(0, 5)}%`;
}
