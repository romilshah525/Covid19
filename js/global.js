let death,
  active,
  jsondata,
  entiredata,
  myChart11,
  myChart12,
  myChart13,
  myChart14,
  confirmed,
  recovered,
  country = "India";
const ctx11 = document.getElementById("myChart11");

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

function plotGraph(data = entiredata, daily = false, size = 16) {
  if (myChart11) {
    myChart11.destroy();
  }
  let confirmed = [],
    death = [],
    recovered = [],
    active = [],
    labels = [],
    totalDeath = 0,
    totalRecovered = 0,
    totalConfirmed = 0,
    totalActive = 0,
    currElement,
    prevElement = {  
      confirmed: 0,
      deaths: 0,
      recovered: 0,
    };
  if (daily) {
    for (let i = 0; i < data.length; i++) {
      currElement = data[i];
      labels.push(
        currElement["date"].split("-").reverse().join("-").slice(0, 4)
      );
      confirmed.push(currElement["confirmed"] - prevElement["confirmed"]);
      death.push(Math.max(currElement["deaths"] - prevElement["deaths"], 0));
      recovered.push(currElement["recovered"] - prevElement["recovered"]);
      active.push(
        Math.max(
          currElement["confirmed"] -
            prevElement["confirmed"] -
            (currElement["deaths"] -
              prevElement["deaths"] +
              (currElement["recovered"] - prevElement["recovered"])),
          0
        )
      );
      prevElement = currElement;
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      currElement = data[i];
      labels.push(
        currElement["date"].split("-").reverse().join("-").slice(0, 4)
      );
      confirmed.push(currElement["confirmed"]);
      death.push(currElement["deaths"]);
      recovered.push(currElement["recovered"]);
      active.push(
        Math.max(
          currElement["confirmed"] -
            (currElement["deaths"] + currElement["recovered"])
        )
      );
      prevElement = currElement;
    }
  }
  totalDeath = prevElement["deaths"];
  totalRecovered = prevElement["recovered"];
  totalConfirmed = prevElement["confirmed"];
  totalActive = totalConfirmed - (totalDeath + totalRecovered);
  document.getElementById("country-name").innerText = country;
  document.getElementById(
    "total-confirmed-cases"
  ).innerText = `${totalConfirmed.toLocaleString()}`;
  document.getElementById(
    "total-recovered-cases"
  ).innerText = `${totalRecovered.toLocaleString()}`;
  document.getElementById(
    "total-active-cases"
  ).innerText = `${totalActive.toLocaleString()}`;
  document.getElementById(
    "total-death-cases"
  ).innerText = `${totalDeath.toLocaleString()}`;
  let optionsConfirmed = {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Confirmed ",
          data: confirmed,
          fill: false,
          backgroundColor: "#223e80ff",
          borderColor: "#223e80ff",
          pointRadius: 0,
          borderWidth: size > 12 ? 3.5 : 1.5,
        },
        {
          label: "Active ",
          data: active,
          fill: false,
          backgroundColor: "#e82727a0",
          borderColor: "#e82727ff",
          pointRadius: 0,
          borderWidth: size > 12 ? 3.5 : 1.5,
        },
        {
          label: "Recovered ",
          data: recovered,
          fill: false,
          backgroundColor: "#2adb2aa0",
          borderColor: "#2adb2aff",
          pointRadius: 0,
          borderWidth: size > 12 ? 3.5 : 1.5,
        },
        {
          label: "Deaths ",
          data: death,
          fill: false,
          backgroundColor: "#8f8c8ca0",
          hoverBorderColor: "#8f8c8cff",
          borderColor: "#8f8c8cf0",
          pointRadius: 0,
          borderWidth: size > 12 ? 3.5 : 1.5,
        },
      ],
    },
    options: {
      responsive: true,
      legend: {
        display: false,
        position: "bottom",
        labels: { fontColor: "#222", fontSize: size },
      },
      title: {
        display: true,
        text: `Covid19 ${daily ? "Daily" : "Cumulative"} Count - ${country}`,
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
                value > 800 ? String(value / 1000) + "k" : value,
            },
          },
        ],
      },
    },
  };
  if (size > 12) {
    optionsConfirmed.options.legend.display = true;
    optionsConfirmed.options.scales.xAxes = [
      {
        display: true,
        scaleLabel: { display: true, labelString: "Date" },
      },
    ];
    optionsConfirmed.options.scales.yAxes = [
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
  document.getElementById("recovery-rate").innerText = `Recovery Rate: ${String(
    (totalRecovered / totalConfirmed) * 100
  ).slice(0, 5)}%`;
  document.getElementById("death-rate").innerText = `Death Rate: ${String(
    (totalDeath / totalConfirmed) * 100
  ).slice(0, 5)}%`;
  myChart11 = new Chart(ctx11.getContext("2d"), optionsConfirmed);
}

function toggle() {
  country = document.getElementById("my-select").value;
  if (window.screen.availWidth <= 650)
    plotGraph(
      entiredata[country],
      !document.getElementById("mySwitch").checked,
      8
    );
  else
    plotGraph(
      entiredata[country],
      !document.getElementById("mySwitch").checked,
      14
    );
}

function insertWorldData(res) {
  document.getElementById("to-be-updated").remove();
  document.getElementById(
    "global-total-confirmed-cases"
  ).innerText = `${res.confirmed.value.toLocaleString()}`;
  document.getElementById(
    "global-total-recovered-cases"
  ).innerText = `${res.recovered.value.toLocaleString()}`;
  document.getElementById("global-total-active-cases").innerText = `${(
    res.confirmed.value -
    (res.recovered.value + res.deaths.value)
  ).toLocaleString()}`;
  document.getElementById(
    "global-total-death-cases"
  ).innerText = `${res.deaths.value.toLocaleString()}`;
  document.getElementById(
    "global-recovery-rate"
  ).innerText = `Recovery Rate: ${String(
    (res.recovered.value / res.confirmed.value) * 100
  ).slice(0, 5)}%`;
  document.getElementById(
    "global-death-rate"
  ).innerText = `Death Rate: ${String(
    (res.deaths.value / res.confirmed.value) * 100
  ).slice(0, 5)}%`;
}

function insertOptionList(data) {
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
  return data;
}

function readData() {
  fetch("https://pomber.github.io/covid19/timeseries.json")
    .catch((err) => fetch("Covid19/json/global.json"))
    .then((response) => response.json())
    .then((data) => insertOptionList(data))
    .then((data) => {
      jsondata = data;
      plotGraph(
        jsondata[country],
        !document.getElementById("mySwitch").checked,
        window.screen.availWidth <= 650 ? 8 : 14
      );
    })
    .then((res) => fetch("https://covid19.mathdro.id/api/"))
    .then((res) => res.json())
    .then((res) => insertWorldData(res))
    .catch((err) => console.log(err));
}
