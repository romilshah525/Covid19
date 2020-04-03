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
  ctx14 = document.getElementById("myChart14").getContext("2d"),
  ctx15 = document.getElementById("myChart15").getContext("2d");

let country = "India";

fetch("https://api.covid19india.org/data.json")
  .then((res) => res.json())
  .then((res) => {
    entireData = res;
    statewise = res.statewise;
    time_series_data = res.cases_time_series;
    plotBubbleChart();
    plotGraph((data = time_series_data));
  });

function plotGraph(data = entiredata, val = false, id = null) {
  let confirmed = [],
    deceased = [],
    active = [],
    recovered = [],
    date = [];
  data.forEach((element) => {
    date.push(element["date"]);
    confirmed.push(Number(element["dailyconfirmed"]));
    deceased.push(Number(element["dailydeceased"]));
    recovered.push(Number(element["dailyrecovered"]));
    active.push(
      Number(element["dailyconfirmed"]) -
        (Number(element["dailyrecovered"]) +
          Number(element["dailydeceased"]) +
          Number(element["dailyrecovered"]))
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
          fill: true,
          backgroundColor: "#223e80a0",
          hoverBorderColor: "#223e80ff",
          borderColor: "#223e80ff",
        },
      ],
    },
    options: {
      responsive: true,
      legend: { position: "bottom", labels: { fontColor: "#223e80ff" } },
      title: {
        display: true,
        text: `Covid19 Confirmed ${
          !val ? "Cumulative" : "Daily"
        } Count - ${country}`,
      },
      tooltips: { mode: "index", intersect: false },
      hover: { mode: "nearest", intersect: true },
      responsive: true,
      chartArea: { backgroundColor: "#223e8011" },
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
        text: `Covid19 Active ${
          !val ? "Cumulative" : "Daily"
        } Count - ${country}`,
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
        text: `Covid19 Recovered ${
          !val ? "Cumulative" : "Daily"
        } Count - ${country}`,
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
        text: `Covid19 Death ${
          !val ? "Cumulative" : "Daily"
        } Count - ${country}`,
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

function plotBubbleChart() {
  let data = [],
    total = 1;
  c = 1;
  statewise.forEach((element) => {
    if (element.state != "Total") {
      data.push({
        x: c,
        y: element.confirmed,
        r: element.confirmed / total + 10,
      });
      c += 2;
    } else {
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
      document.getElementById(
        "recovery-rate"
      ).innerText = `Recovery Rate: ${String(
        (totalReceoveredCovidOrg / totalConfirmedCovidOrg) * 100
      ).slice(0, 5)}%`;
      document.getElementById("death-rate").innerText = `Death Rate: ${String(
        (totalDeathsCovidOrg / totalConfirmedCovidOrg) * 100
      ).slice(0, 5)}%`;
    }
  });

  function colorize(opaque, context) {
    let value = context.dataset.data[context.dataIndex];
    let x = value.x / 100,
      y = value.y / 100,
      r = x < 0 && y < 0 ? 250 : x < 0 ? 150 : y < 0 ? 50 : 0,
      g = x < 0 && y < 0 ? 0 : x < 0 ? 50 : y < 0 ? 150 : 250,
      b = x < 0 && y < 0 ? 0 : x > 0 && y > 0 ? 250 : 150,
      a = opaque ? 1 : (9.9 * value.r) / 100;
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }
  data = { datasets: [{ data }] };
  let options = {
    responsive: true,
    maintainAspectRatio: false,
    tootips: false,
    legend: { position: "bottom", labels: { fontSize: 12 } },
    title: {
      display: true,
      text: "Covid 19 Confirmed Cases in Indian States",
      fontSize: 18,
    },
    scales: {
      xAxes: [
        { gridLines: false },
        { scaleLabel: { display: true, labelString: "State" } },
      ],
    },
    yAxes: [
      { gridLines: false },
      { scaleLabel: { display: true, labelString: "Confirmed Cases" } },
    ],
    aspectRatio: 1,
    elements: {
      point: {
        backgroundColor: colorize.bind(null, false),
        borderColor: colorize.bind(null, true),
        hoverBorderWidth: 6,
        borderWidth: function (context) {
          return Math.min(Math.max(1, context.datasetIndex + 1), 8);
        },
        hoverBorderColor: function (context) {
          let value = context.dataset.data[context.dataIndex];
          return Math.round((0.8 * value.r) / 1000);
        },
        hoverBorderWidth: function (context) {
          let value = context.dataset.data[context.dataIndex];
          return Math.round((0.99 * value.r) / 7);
        },
      },
    },
  };

  let bubbleChart = new Chart(ctx15, {
    type: "bubble",
    data: data,
    options: options,
  });
}
