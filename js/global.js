let jsondata,
  entiredata,
  myChart11,
  myChart12,
  myChart13,
  myChart14,
  country = "India";
const ctx11 = document.getElementById("myChart11"),
  ctx12 = document.getElementById("myChart12"),
  ctx13 = document.getElementById("myChart13"),
  ctx14 = document.getElementById("myChart14");

Chart.pluginService.register({
  beforeDraw: function (chart, easing) {
    if (
      chart.config.options.chartArea &&
      chart.config.options.chartArea.backgroundColor
    ) {
      let ctx = chart.chart.ctx,
        chartArea = chart.chartArea;
      ctx.save();
      ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
      ctx.fillRect(
        chartArea.left,
        chartArea.top,
        chartArea.right - chartArea.left,
        chartArea.bottom - chartArea.top
      );
      ctx.restore();
    }
  },
});

function plotGraph(data = entiredata, daily = false, id = null, size = 16) {
  if (id) {
    data = entiredata[id];
  }
  if (myChart11) {
    myChart11.destroy();
    myChart12.destroy();
    myChart13.destroy();
    myChart14.destroy();
  }
  let labels = [],
    confirmed = [],
    death = [],
    recovered = [],
    active = [],
    prevC = 0,
    prevD = 0,
    prevR = 0,
    prevA = 0,
    totalDeath = 0,
    totalRecovered = 0,
    totalConfirmed = 0,
    totalActive = 0;
  data.forEach((element) => {
    labels.push(element["date"].split("-").reverse().join("-").slice(0, 4));
    if (daily) {
      confirmed.push(Math.max(element["confirmed"] - prevC, 0));
      death.push(Math.max(element["deaths"] - prevD, 0));
      recovered.push(element["recovered"] - prevR);
      temp =
        element["confirmed"] -
        (element["deaths"] + element["recovered"] + prevA);
      active.push(temp < 0 ? 0 : temp);
      prevC = Math.max(element["confirmed"], 0);
      prevD = Math.max(element["deaths"] - prevD, 0);
      prevR = element["recovered"];
      prevA = temp < 0 ? 0 : temp;
    } else {
      confirmed.push(element["confirmed"]);
      death.push(element["deaths"]);
      recovered.push(element["recovered"]);
      active.push(
        element["confirmed"] - (element["deaths"] + element["recovered"])
      );
    }
  });
  totalDeath = death.slice(-1);
  totalRecovered = recovered.slice(-1);
  totalConfirmed = confirmed.slice(-1);
  totalActive = active.slice(-1);
  document.getElementById(
    "total-confirmed-cases"
  ).innerText = `Positive Cases: ${totalConfirmed}`;
  document.getElementById(
    "total-recovered-cases"
  ).innerText = `Recovered Cases: ${totalRecovered}`;
  document.getElementById(
    "total-active-cases"
  ).innerText = `Active Cases: ${totalActive}`;
  document.getElementById(
    "total-death-cases"
  ).innerText = `Death Cases: ${totalDeath}`;
  let optionsConfirmed = {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Confirmed ",
          data: confirmed,
          fill: false,
          backgroundColor: "#223e80a0",
          hoverBorderColor: "#223e80ff",
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
        text: `Covid19 Confirmed ${
          daily ? "Daily" : "Cumulative"
        } Count - ${country}`,
        fontSize: size + 4,
      },
      tooltips: { mode: "index", intersect: false },
      hover: { mode: "nearest", intersect: true },
      chartArea: { backgroundColor: "#223e8011" },
      scales: {
        xAxes: [{ gridLines: { display: false } }],
        yAxes: [{ gridLines: { display: false } }],
      },
    },
  };
  let optionsActive = {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Active ",
          data: active,
          fill: false,
          backgroundColor: "#e82727a0",
          hoverBorderColor: "#e82727ff",
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
        text: `Covid19 Active ${
          daily ? "Daily" : "Cumulative"
        } Count - ${country}`,
        fontSize: size + 4,
      },
      tooltips: { mode: "index", intersect: false },
      hover: { mode: "nearest", intersect: true },
      chartArea: { backgroundColor: "#e8272711" },
      scales: {
        xAxes: [{ gridLines: { display: false } }],
        yAxes: [{ gridLines: { display: false } }],
      },
    },
  };
  let optionsRecovered = {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Recovered ",
          data: recovered,
          fill: false,
          backgroundColor: "#2adb2aa0",
          hoverBorderColor: "#2adb2aff",
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
        text: `Covid19 Recovered ${
          daily ? "Daily" : "Cumulative"
        } Count - ${country}`,
        fontSize: size + 4,
      },
      tooltips: { mode: "index", intersect: false },
      hover: { mode: "nearest", intersect: true },
      chartArea: { backgroundColor: "#2adb2a11" },
      scales: {
        xAxes: [{ gridLines: { display: false } }],
        yAxes: [{ gridLines: { display: false } }],
      },
    },
  };
  let optionsDeaths = {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Deaths ",
          data: death,
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
        text: `Covid19 Death ${
          daily ? "Daily" : "Cumulative"
        } Count - ${country}`,
        fontSize: size + 4,
      },
      tooltips: { mode: "index", intersect: false },
      hover: { mode: "nearest", intersect: true },
      chartArea: { backgroundColor: "#8f8c8c10" },
      scales: {
        xAxes: [{ gridLines: { display: false } }],
        yAxes: [{ gridLines: { display: false } }],
      },
    },
  };
  if (size > 12) {
    let allOptions = [
      optionsConfirmed,
      optionsDeaths,
      optionsRecovered,
      optionsActive,
    ];
    allOptions.forEach((opt) => {
      opt.options.scales.xAxes = [
        {
          display: true,
          scaleLabel: { display: true, labelString: "Date" },
          // gridLines: { display: false },
        },
      ];
      opt.options.scales.yAxes = [
        {
          display: true,
          scaleLabel: { display: true, labelString: "Count " },
          // gridLines: { display: false },
        },
      ];
    });
  }
  if (daily) {
    document.getElementById(
      "recovery-rate"
    ).innerText = `Recovery Rate: NA (Choose Cumulative Type)`;
    document.getElementById(
      "death-rate"
    ).innerText = `Death Rate: NA (Choose Cumulative Type)`;
  } else {
    document.getElementById(
      "recovery-rate"
    ).innerText = `Recovery Rate: ${String(
      (totalRecovered / totalConfirmed) * 100
    ).slice(0, 5)}%`;
    document.getElementById("death-rate").innerText = `Death Rate: ${String(
      (totalDeath / totalConfirmed) * 100
    ).slice(0, 5)}%`;
  }
  myChart11 = new Chart(ctx11.getContext("2d"), optionsConfirmed);
  myChart12 = new Chart(ctx12.getContext("2d"), optionsActive);
  myChart13 = new Chart(ctx13.getContext("2d"), optionsRecovered);
  myChart14 = new Chart(ctx14.getContext("2d"), optionsDeaths);
}

function readData() {
  fetch("https://pomber.github.io/covid19/timeseries.json")
    .catch((err) => fetch("Covid19/json/data.json"))
    .then((response) => response.json())
    .then((data) => {
      let elem = document.getElementById("my-select");
      let res = "";
      Object.keys(data).forEach((key) => {
        res += `<option value="${key}">${key}</option>`;
      });
      elem.innerHTML = res;
      elem.value = country;
      entiredata = data;
      $(document).ready(function () {
        $("select").formSelect();
      });
      return data[country];
    })
    .then((data) => {
      jsondata = data;
      if (window.screen.availWidth <= 650)
        plotGraph(
          jsondata,
          !document.getElementById("mySwitch").checked,
          null,
          8
        );
      else
        plotGraph(
          jsondata,
          !document.getElementById("mySwitch").checked,
          null,
          14
        );
    });
}

function toggle() {
  country = document.getElementById("my-select").value;
  if (window.screen.availWidth <= 650)
    plotGraph(
      entiredata[country],
      !document.getElementById("mySwitch").checked,
      null,
      8
    );
  else
    plotGraph(
      entiredata[country],
      !document.getElementById("mySwitch").checked,
      null,
      14
    );
}
