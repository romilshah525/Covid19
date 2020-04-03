let entireData, state_district_wise, state_daily, time_series_data, statewise;
const ctx11 = document.getElementById("myChart11"),
  ctx12 = document.getElementById("myChart12"),
  ctx13 = document.getElementById("myChart13"),
  ctx14 = document.getElementById("myChart14");
fetch("https://api.covid19india.org/data.json")
  .then((res) => res.json())
  .then((res) => {
    entireData = res;
    statewise = res.statewise;
    time_series_data = res.cases_time_series;
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
      }
    });
    console.log(data);

    function colorize(opaque, context) {
      let value = context.dataset.data[context.dataIndex];
      let x = value.x / 100,
        y = value.y / 100;
      let r = x < 0 && y < 0 ? 250 : x < 0 ? 150 : y < 0 ? 50 : 0;
      let g = x < 0 && y < 0 ? 0 : x < 0 ? 50 : y < 0 ? 150 : 250;
      let b = x < 0 && y < 0 ? 0 : x > 0 && y > 0 ? 250 : 150;
      let a = opaque ? 1 : (9.9 * value.r) / 100;
      return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    }
    data = { datasets: [{ data }] };
    let options = {
      responsive: true,
      maintainAspectRatio: false,
      tootips: false,
      legend: { position: "bottom", labels: { fontSize: 12 } },
      title: { display: true, text: "Market Capital Share", fontSize: 18 },
      scales: {
        xAxes: [
          { gridLines: false },
          { scaleLabel: { display: true, labelString: "Total Amount (Rs.)" } },
        ],
      },
      yAxes: [
        { gridLines: false },
        { scaleLabel: { display: true, labelString: "Average Amount (Rs.)" } },
      ],
      aspectRatio: 1,
      elements: {
        point: {
          backgroundColor: colorize.bind(null, false),
          borderColor: colorize.bind(null, true),
          hoverBorderWidth: 6,
          // hoverBackgroundColor: "transparent",
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

    let chart = new Chart("myChart11", {
      type: "bubble",
      data: data,
      options: options,
    });
  });
