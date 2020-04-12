let jsondata,
  entiredata,
  myChart11,
  myChart12,
  myChart13,
  myChart14,
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
  temp = "";
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
        Math.max(
          element["confirmed"] - (element["deaths"] + element["recovered"]),
          0
        )
      );
    }
    temp = element;
  });
  totalDeath = temp["deaths"];
  totalRecovered = temp["recovered"];
  totalConfirmed = temp["confirmed"];
  totalActive = totalConfirmed - (totalDeath + totalRecovered);
  document.getElementById(
    "total-confirmed-cases"
  ).innerText = `${totalConfirmed}`;
  document.getElementById(
    "total-recovered-cases"
  ).innerText = `${totalRecovered}`;
  document.getElementById("total-active-cases").innerText = `${totalActive}`;
  document.getElementById("total-death-cases").innerText = `${totalDeath}`;
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
        },
        {
          label: "Active ",
          data: active,
          fill: false,
          backgroundColor: "#e82727a0",
          borderColor: "#e82727ff",
        },
        {
          label: "Recovered ",
          data: recovered,
          fill: false,
          backgroundColor: "#2adb2aa0",
          borderColor: "#2adb2aff",
        },
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
        xAxes: [{ gridLines: { display: false } }],
        yAxes: [{ gridLines: { display: false } }],
      },
    },
  };
  if (size > 12) {
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
      },
    ];
  }
  if (daily) {
    document.getElementById(
      "recovery-rate"
    ).innerText = `Recovery Rate: NA (Select Cumulative)`;
    document.getElementById(
      "death-rate"
    ).innerText = `Death Rate: NA (Select Cumulative)`;
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
      return data;
    })
    .then((data) => {
      jsondata = data;
      if (window.screen.availWidth <= 650)
        plotGraph(
          jsondata[country],
          !document.getElementById("mySwitch").checked,
          6
        );
      else
        plotGraph(
          jsondata[country],
          !document.getElementById("mySwitch").checked,
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
      8
    );
  else
    plotGraph(
      entiredata[country],
      !document.getElementById("mySwitch").checked,
      14
    );
}
