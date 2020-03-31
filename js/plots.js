let jsondata, entiredata;
const ctx11 = document.getElementById("myChart11"),
  ctx12 = document.getElementById("myChart12"),
  ctx13 = document.getElementById("myChart13"),
  ctx14 = document.getElementById("myChart14");
let myChart11, myChart12, myChart13, myChart14;
Chart.pluginService.register({
  beforeDraw: function(chart, easing) {
    if (
      chart.config.options.chartArea &&
      chart.config.options.chartArea.backgroundColor
    ) {
      var ctx = chart.chart.ctx;
      var chartArea = chart.chartArea;

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
  }
});
function plotGraph(data = entiredata, val = false, id = null) {
  if (id) {
    console.log(id);
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
  data.forEach(element => {
    labels.push(
      element["date"]
        .split("-")
        .reverse()
        .join("-")
        .slice(0, 4)
    );
    if (!val) {
      confirmed.push(element["confirmed"]);
      death.push(element["deaths"]);
      recovered.push(element["recovered"]);
      active.push(
        element["confirmed"] - (element["deaths"] + element["recovered"])
      );
    } else {
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
    }
  });
  totalDeath = death.slice(-1);
  totalRecovered = recovered.slice(-1);
  totalConfirmed = confirmed.slice(-1);
  totalActive = active.slice(-1);
  document.getElementById(
    "total-confirmed-cases"
  ).innerText = `Positives: ${totalConfirmed}`;
  document.getElementById(
    "total-recovered-cases"
  ).innerText = `Recoveries: ${totalRecovered}`;
  document.getElementById(
    "total-active-cases"
  ).innerText = `Active: ${totalActive}`;
  document.getElementById(
    "total-death-cases"
  ).innerText = `Deaths: ${totalDeath}`;
  if (!val) {
    document.getElementById(
      "recovery-rate"
    ).innerText = `Recovery Rate: ${String(
      (totalRecovered / totalConfirmed) * 100
    ).slice(0, 5)}%`;
    document.getElementById("death-rate").innerText = `Death Rate: ${String(
      (totalDeath / totalConfirmed) * 100
    ).slice(0, 5)}%`;
  } else {
    document.getElementById(
      "recovery-rate"
    ).innerText = `Recovery Rate: NA (Choose Cumulative Type)`;
    document.getElementById(
      "death-rate"
    ).innerText = `Death Rate: NA (Choose Cumulative Type)`;
  }
  myChart11 = new Chart(ctx11.getContext("2d"), {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Confirmed ",
          data: confirmed,
          fill: true,
          backgroundColor: "#223e80a0",
          hoverBorderColor: "#223e80ff",
          borderColor: "#223e80ff"
        }
      ]
    },
    options: {
      responsive: true,
      legend: {
        position: "bottom",
        labels: {
          fontColor: "#223e80ff"
        }
      },
      title: {
        display: true,
        text: `Covid19 Confirmed ${
          !val ? "Cumulative" : "Daily"
        } Count - ${country}`
      },
      tooltips: {
        mode: "index",
        intersect: false
      },
      hover: {
        mode: "nearest",
        intersect: true
      },
      responsive: true,
      chartArea: {
        backgroundColor: "#223e8011"
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Date"
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Confirmed Count "
            }
          }
        ]
      }
    }
  });
  myChart12 = new Chart(ctx12.getContext("2d"), {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Active ",
          data: active,
          fill: true,
          backgroundColor: "#e82727a0",
          hoverBorderColor: "#e82727ff",
          borderColor: "#e82727ff"
        }
      ]
    },
    options: {
      responsive: true,
      legend: {
        position: "bottom",
        labels: {
          fontColor: "#e82727ff"
        }
      },
      title: {
        display: true,
        text: `Covid19 Active ${
          !val ? "Cumulative" : "Daily"
        } Count - ${country}`
      },
      tooltips: {
        mode: "index",
        intersect: false
      },
      hover: {
        mode: "nearest",
        intersect: true
      },
      responsive: true,
      chartArea: {
        backgroundColor: "#e8272711"
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Date"
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Active Count "
            }
          }
        ]
      }
    }
  });
  myChart13 = new Chart(ctx13.getContext("2d"), {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Recovered ",
          data: recovered,
          fill: true,
          backgroundColor: "#2adb2aa0",
          hoverBorderColor: "#2adb2aff",
          borderColor: "#2adb2aff"
        }
      ]
    },
    options: {
      responsive: true,
      legend: {
        position: "bottom",
        labels: {
          fontColor: "#34bf34ff"
        }
      },
      title: {
        display: true,
        text: `Covid19 Recovered ${
          !val ? "Cumulative" : "Daily"
        } Count - ${country}`
      },
      tooltips: {
        mode: "index",
        intersect: false
      },
      hover: {
        mode: "nearest",
        intersect: true
      },
      responsive: true,
      chartArea: {
        backgroundColor: "#2adb2a11"
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Date"
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Recovered Count "
            }
          }
        ]
      }
    }
  });
  myChart14 = new Chart(ctx14.getContext("2d"), {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Deaths ",
          data: death,
          fill: true,
          backgroundColor: "#8f8c8ca0",
          hoverBorderColor: "#8f8c8cff",
          borderColor: "#8f8c8cf0"
        }
      ]
    },
    options: {
      responsive: true,
      legend: {
        position: "bottom",
        labels: {
          fontColor: "#8f8c8cff"
        }
      },
      title: {
        display: true,
        text: `Covid19 Death ${
          !val ? "Cumulative" : "Daily"
        } Count - ${country}`
      },
      tooltips: {
        mode: "index",
        intersect: false
      },
      hover: {
        mode: "nearest",
        intersect: true
      },
      responsive: true,
      chartArea: {
        backgroundColor: "#8f8c8c10"
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Date"
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Deaths Count "
            }
          }
        ]
      }
    }
  });
}
let country = "India";
document.addEventListener("DOMContentLoaded", function() {
  // fetch("https://www.geoplugin.net/json.gp?ip=")
  //   .then(res => res.json())
  //   .then(data => {
  //     country = data["geoplugin_countryName"];
  //     return fetch("https://pomber.github.io/covid19/timeseries.json");
  //   })
  fetch("https://pomber.github.io/covid19/timeseries.json")
    .catch(err => fetch("Covid19/data.json"))
    .then(response => response.json())
    .then(data => {
      let elem = document.getElementById("my-select");
      let res = "";
      Object.keys(data).forEach(key => {
        res += `<option value="${key}">${key}</option>`;
      });
      elem.innerHTML = res;
      elem.value = country;
      entiredata = data;

      $(document).ready(function() {
        $("select").formSelect();
      });
      return data[country];
    })
    .then(data => {
      jsondata = data;
      const val = document.getElementById("mySwitch").checked;
      plotGraph(jsondata, val);
    });
});

function toggle() {
  country = document.getElementById("my-select").value;
  plotGraph(entiredata[country], document.getElementById("mySwitch").checked);
}

function countryChanged() {
  country = document.getElementById("my-select").value;
  plotGraph(entiredata[country], document.getElementById("mySwitch").checked);
}

$(".dropdown-trigger").dropdown();
$(".sidenav")
  .sidenav()
  .on("click tap", "li a", () => {
    $(".sidenav").sidenav("close");
  });
if ($(window).width() <= 599) {
  let a = document.getElementsByClassName("add-class");
  for (i of a) {
    i.classList.remove("container");
  }
}
