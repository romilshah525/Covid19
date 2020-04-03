function colorize(opaque, context) {
  let value = context.dataset.data[context.dataIndex];
  let x = value.x / 100;
  let y = value.y / 100;
  let r = x < 0 && y < 0 ? 250 : x < 0 ? 150 : y < 0 ? 50 : 0;
  let g = x < 0 && y < 0 ? 0 : x < 0 ? 50 : y < 0 ? 150 : 250;
  let b = x < 0 && y < 0 ? 0 : x > 0 && y > 0 ? 250 : 150;
  let a = opaque ? 1 : (9.9 * value.r) / 1000;
  return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

let data = [
  { x: 10, y: 10, r: 30 },
  { x: 20, y: 20, r: 30 },
  { x: 30, y: 30, r: 30 },
  { x: 40, y: 40, r: 30 },
  { x: 50, y: 50, r: 30 },
  { x: 60, y: 60, r: 30 },
  { x: 70, y: 70, r: 30 },
  { x: 80, y: 80, r: 30 },
];
data = { datasets: [{ data }] };
let options = {
  responsive: true,
  maintainAspectRatio: false,
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

let chart = new Chart("myChart13", {
  type: "bubble",
  data: data,
  options: options,
});
