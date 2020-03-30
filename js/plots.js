var jsondata, entiredata;
const ctx11 = document.getElementById("myChart11"),
  ctx12 = document.getElementById("myChart12"),
  ctx13 = document.getElementById("myChart13"),
  ctx14 = document.getElementById("myChart14");
let myChart11, myChart12, myChart13, myChart14;
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
    prevA = 0;
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
      // confirmed.push(element["confirmed"] - prevC);
      // death.push(element["deaths"] - prevD);
      // recovered.push(element["recovered"]-prevR);
      // active.push(element["confirmed"] - (element["deaths"] + element["recovered"])- prevA);
      // prevC = element["confirmed"];
      // prevD = element["deaths"];
      // prevR = element["recovered"];
      // prevA = element["confirmed"] - (element["deaths"] + element["recovered"]);
    }
  });
  myChart11 = new Chart(ctx11.getContext("2d"), {
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
          fill: false,
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
          fill: false,
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
          fill: false,
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
  fetch("http://www.geoplugin.net/json.gp?ip=")
    .then(res => res.json())
    .then(data => {
      country = data["geoplugin_countryName"];
      return fetch("https://pomber.github.io/covid19/timeseries.json");
    })
    .catch(err => fetch("../data.json"))
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
