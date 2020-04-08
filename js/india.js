let entireData,
  state_district_wise,
  state_daily,
  time_series_data,
  statewise,
  totalActiveCovidOrg,
  totalConfirmedCovidOrg,
  totalDeathsCovidOrg,
  totalReceoveredCovidOrg,
  name = "India";

const ctx11 = document.getElementById("myChart11").getContext("2d"),
  ctx12 = document.getElementById("myChart12").getContext("2d"),
  ctx13 = document.getElementById("myChart13").getContext("2d"),
  ctx14 = document.getElementById("myChart14").getContext("2d");

function readData() {
  fetch("https://api.covid19india.org/data.json")
    .catch((err) => fetch("Covid19/json/india.json"))
    .then((res) => res.json())
    .then((res) => {
      entireData = res;
      statewise = res.statewise;
      time_series_data = res.cases_time_series;
      statewise[0]["state"] = "India";
      let elem = document.getElementById("my-select");
      let ret = "";
      statewise.forEach((a) => {
        ret += `<option value="${a["state"]}">${a["state"]}</option>`;
      });
      elem.innerHTML = ret;
      elem.value = name;
      $(document).ready(function () {
        $("select").formSelect();
      });
      printSummary();
      if (window.screen.availWidth <= 650)
        plotGraph(time_series_data, 6, "India");
      else plotGraph(time_series_data, 14, "India");
    });
}

function plotGraph(data, size, ct) {
  let confirmed = [],
    deceased = [],
    active = [],
    recovered = [],
    date = [];
  if (ct == "India") {
    if (size < 12) {
      for (let i = 0; i < data.length; i += 5) {
        element = data[i];
        date.push(element["date"].slice(0, 6));
        confirmed.push(Number(element["dailyconfirmed"]));
        deceased.push(Number(element["dailydeceased"]));
        recovered.push(Number(element["dailyrecovered"]));
        active.push(
          Number(element["dailyconfirmed"]) -
            (Number(element["dailyrecovered"]) +
              Number(element["dailydeceased"]))
        );
      }
    } else {
      data.forEach((element) => {
        date.push(element["date"].slice(0, 6));
        confirmed.push(Number(element["dailyconfirmed"]));
        deceased.push(Number(element["dailydeceased"]));
        recovered.push(Number(element["dailyrecovered"]));
        active.push(
          Number(element["dailyconfirmed"]) -
            (Number(element["dailyrecovered"]) +
              Number(element["dailydeceased"]))
        );
      });
    }
  }
  let optionsConfirmed = {
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
        text: `Covid19 Confirmed Daily Count - ${name}`,
        fontSize: size + 4,
      },
      tooltips: { mode: "index", intersect: false },
      hover: { mode: "nearest", intersect: true },
      responsive: true,
      chartArea: { backgroundColor: "#223e8011" },
      scales: {
        xAxes: [{}],
        yAxes: [{}],
      },
    },
  };
  let optionsActive = {
    type: "line",
    data: {
      labels: date,
      datasets: [
        {
          label: "Active ",
          data: active,
          fill: false,
          backgroundColor: "#e82727a0",
          borderColor: "#e82727ff",
        },
      ],
    },
    options: {
      responsive: true,
      legend: {
        position: "bottom",
        labels: { fontColor: "#e82727ff", fontSize: size },
      },
      title: {
        display: true,
        text: `Covid19 Active Daily Count - ${name}`,
        fontSize: size + 4,
      },
      tooltips: { mode: "index", intersect: false },
      hover: { mode: "nearest", intersect: true },
      responsive: true,
      chartArea: { backgroundColor: "#e8272711" },
      scales: {
        xAxes: [{}],
        yAxes: [{}],
      },
    },
  };
  let optionsRecovered = {
    type: "line",
    data: {
      labels: date,
      datasets: [
        {
          label: "Recovered ",
          data: recovered,
          fill: false,
          backgroundColor: "#2adb2aa0",
          borderColor: "#2adb2aff",
        },
      ],
    },
    options: {
      responsive: true,
      legend: {
        position: "bottom",
        labels: { fontColor: "#34bf34ff", fontSize: size },
      },
      title: {
        display: true,
        text: `Covid19 Recovered Daily Count - ${name}`,
        fontSize: size + 4,
      },
      tooltips: { mode: "index", intersect: false },
      hover: { mode: "nearest", intersect: true },
      responsive: true,
      chartArea: { backgroundColor: "#2adb2a11" },
      scales: {
        xAxes: [{}],
        yAxes: [{}],
      },
    },
  };
  let optionsDeath = {
    type: "line",
    data: {
      labels: date,
      datasets: [
        {
          label: "Deaths ",
          data: deceased,
          fill: false,
          backgroundColor: "#8f8c8ca0",
          hoverBorderColor: "#8f8c8cff",
          borderColor: "#8f8c8cf0",
        },
      ],
    },
    options: {
      responsive: true,
      legend: {
        position: "bottom",
        labels: { fontColor: "#8f8c8cff", fontSize: size },
      },
      title: {
        display: true,
        text: `Covid19 Death Daily Count - ${name}`,
        fontSize: size + 4,
      },
      tooltips: { mode: "index", intersect: false },
      hover: { mode: "nearest", intersect: true },
      responsive: true,
      chartArea: { backgroundColor: "#8f8c8c10" },
      scales: {
        xAxes: [{}],
        yAxes: [{}],
      },
    },
  };
  if (size > 12) {
    let allOptions = [
      optionsConfirmed,
      optionsDeath,
      optionsRecovered,
      optionsActive,
    ];
    allOptions.forEach((opt) => {
      opt.options.scales.xAxes = [
        {
          display: true,
          scaleLabel: { display: true, labelString: "Date" },
        },
      ];
      opt.options.scales.yAxes = [
        {
          display: true,
          scaleLabel: { display: true, labelString: "Count " },
        },
      ];
    });
  }
  myChart11 = new Chart(ctx11, optionsConfirmed);
  myChart12 = new Chart(ctx12, optionsActive);
  myChart13 = new Chart(ctx13, optionsRecovered);
  myChart14 = new Chart(ctx14, optionsDeath);
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

function toggle() {
  name = document.getElementById("my-select").value;
  if (name == "India") {
    if (window.screen.availWidth <= 650) plotGraph(time_series_data, 6, name);
    else plotGraph(time_series_data, 14, name);
  } else {
    if (window.screen.availWidth <= 650) plotGraph(statewise, 6, name);
    else plotGraph(statewise, 14, name);
  }
}
