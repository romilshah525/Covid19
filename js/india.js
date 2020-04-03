let entireData, state_district_wise, state_daily, time_series_data, statewise;
const ctx11 = document.getElementById("myChart11"),
  ctx12 = document.getElementById("myChart12"),
  ctx13 = document.getElementById("myChart13"),
  ctx14 = document.getElementById("myChart14");
fetch("https://api.covid19india.org/data.json")
  .then(res => res.json())
  .then(res => {
    entireData = res;
    statewise = res.statewise;
    time_series_data = res.cases_time_series;
    plotGraph((data = time_series_data));
  });

function plotGraph(data = entiredata, val = false, id = null) {
  let confirmed = [],
    deceased = [],
    recovered = [],
    date = [];
  data.forEach(element => {
    date.push(element["date"]);
    confirmed.push(Number(element["dailyconfirmed"]));
    deceased.push(Number(element["dailydeceased"]));
    recovered.push(Number(element["dailyrecovered"]));
  });
  myChart11 = new Chart(ctx11.getContext("2d"), {
    type: "bar",
    data: {
      labels: date,
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
        text: `Covid19 Confirmed Daily Count - India`
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
            ticks: {
              min: 0,
              stepSize: 15
            },
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
    type: "bar",
    data: {
      labels: date,
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
        text: `Covid19 Confirmed Daily Count - India`
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
            ticks: {
              min: 0,
              stepSize: 15
            },
            scaleLabel: {
              display: true,
              labelString: "Confirmed Count "
            }
          }
        ]
      }
    }
  });
}
