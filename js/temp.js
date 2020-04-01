var config = {
  type: "line",
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "red",
        borderColor: "red",
        data: [1, 2, 3, 4, 5, 6, 7],
        fill: false
      },
      {
        label: "My Secind dataset",
        backgroundColor: "blue",
        borderColor: "blue",
        data: [8, 9, 10, 11, 12, 13, 14],
        fill: false
      }
    ]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: "Chart.js Line Chart"
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
            labelString: "Month"
          }
        }
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Value"
          },
          ticks: {
            min: 0,
            max: 100,

            // forces step size to be 5 units
            stepSize: 5
          }
        }
      ]
    }
  }
};

window.onload = function() {
  var ctx = document.getElementById("myChart11").getContext("2d");
  window.myLine = new Chart(ctx, config);
};
