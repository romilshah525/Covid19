const mapper = {
  in: "India",
  an: "Andaman and Nicobar Islands",
  ap: "Andhra Pradesh",
  ar: "Arunachal Pradesh",
  as: "Assam",
  br: "Bihar",
  ch: "Chandigarh",
  ct: "Chhattisgarh",
  dd: "Daman and Diu",
  dl: "Delhi",
  dn: "Dadra and Nagar Haveli",
  ga: "Goa",
  gj: "Gujarat",
  hp: "Himachal Pradesh",
  hr: "Haryana",
  jk: "Jammu and Kashmir",
  ka: "Karnataka",
  kl: "Kerala",
  la: "Ladakh",
  ld: "Lakshadweep",
  mh: "Maharashtra",
  ml: "Meghalaya",
  mn: "Manipur",
  mp: "Madhya Pradesh",
  mz: "Mizoram",
  nl: "Nagaland",
  or: "Odisha",
  pb: "Punjab",
  py: "Puducherry",
  rj: "Rajasthan",
  sk: "Sikkim",
  tg: "Telangana",
  tn: "Tamil Nadu",
  tr: "Tripura",
  up: "Uttar Pradesh",
  ut: "Uttarakhand",
  wb: "West Bengal",
};

let entireData,
  time_series_data,
  states_daily,
  statewise,
  totalActiveCovidOrg,
  totalConfirmedCovidOrg,
  totalDeathsCovidOrg,
  totalReceoveredCovidOrg,
  name = "India",
  myChart11,
  myChart15,
  state_district_data;

const ctx11 = document.getElementById("myChart11").getContext("2d"),
  ctx15 = document.getElementById("myChart15").getContext("2d");

function insertOptionList(res) {
  states_daily = res.states_daily;
  let elem = document.getElementById("my-select");
  let ret = "";
  statewise[0]["state"] = "India";
  statewise[0]["statecode"] = "IN";
  let keys = Object.keys(mapper);
  keys.forEach((a) => {
    ret += `<option value="${a}">${mapper[a]}</option>`;
  });
  elem.innerHTML = ret;
  elem.value = name;
  document.getElementById(
    "to-be-updated"
  ).innerHTML = `<div class="col s6"><h6 class="black-text right">Last Updated At</h6></div><div class="col s6"><h6 class="black-text left">${statewise[0]["lastupdatedtime"]}</h6></div>`;
  document.getElementById("my-select").value = "in";
  if (window.screen.availWidth <= 650) plotGraph(time_series_data, 6, "in");
  else plotGraph(time_series_data, 14, "in");
  $(document).ready(function () {
    $("select").formSelect();
  });
}

function plotGraph(data, size, ct) {
  if (myChart11) {
    myChart11.destroy();
  }
  let confirmed = [],
    deceased = [],
    active = [],
    recovered = [],
    date = [];
  if (ct == "in") {
    name = "India";
  } else {
    name = mapper[ct];
  }
  if (size < 12) {
    for (let i = 0; i < data.length; i += 3) {
      element = data[i];
      date.push(element["date"].slice(0, 6));
      confirmed.push(Number(element["dailyconfirmed"]));
      deceased.push(Number(element["dailydeceased"]));
      recovered.push(Number(element["dailyrecovered"]));
      active.push(
        Math.max(
          Number(element["dailyconfirmed"]) -
            (Number(element["dailyrecovered"]) +
              Number(element["dailydeceased"])),
          0
        )
      );
    }
  } else {
    data.forEach((element) => {
      date.push(element["date"].slice(0, 6));
      confirmed.push(Number(element["dailyconfirmed"]));
      deceased.push(Number(element["dailydeceased"]));
      recovered.push(Number(element["dailyrecovered"]));
      active.push(
        Math.max(
          Number(element["dailyconfirmed"]) -
            (Number(element["dailyrecovered"]) +
              Number(element["dailydeceased"])),
          0
        )
      );
    });
  }
  let optionsIndiaData = {
    data: {
      labels: date,
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
          data: deceased,
          fill: false,
          backgroundColor: "#8f8c8ca0",
          borderColor: "#8f8c8cf0",
          pointRadius: 0,
          borderWidth: size > 12 ? 3.5 : 1.5,
        },
      ],
    },
    type: "line",
    options: {
      responsive: true,
      legend: {
        display: false,
        position: "bottom",
        labels: { fontColor: "#222", fontSize: size },
      },
      title: {
        display: true,
        text: `Covid19 Daily Count - ${name}`,
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
    optionsIndiaData.options.legend.display = true;
    optionsIndiaData.options.scales.xAxes = [
      {
        display: true,
        scaleLabel: { display: true, labelString: "Date" },
      },
    ];
    optionsIndiaData.options.scales.yAxes = [
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
  myChart11 = new Chart(ctx11, optionsIndiaData);
  element = statewise.filter((el) => el["statecode"] == ct.toUpperCase())[0];
  total = element.confirmed;
  totalActiveCovidOrg = element.active;
  totalConfirmedCovidOrg = element.confirmed;
  totalDeathsCovidOrg = element.deaths;
  totalReceoveredCovidOrg = element.recovered;
  document.getElementById("total-confirmed-cases").innerText = `${Number(
    totalConfirmedCovidOrg
  ).toLocaleString()}`;
  document.getElementById("total-recovered-cases").innerText = `${Number(
    totalReceoveredCovidOrg
  ).toLocaleString()}`;
  document.getElementById("total-active-cases").innerText = `${Number(
    totalActiveCovidOrg
  ).toLocaleString()}`;
  document.getElementById("total-death-cases").innerText = `${Number(
    totalDeathsCovidOrg
  ).toLocaleString()}`;

  document.getElementById("recovery-rate").innerText = `Recovery Rt: ${String(
    (totalReceoveredCovidOrg / totalConfirmedCovidOrg) * 100
  ).slice(0, 5)}%`;
  document.getElementById("death-rate").innerText = `Death Rate: ${String(
    (totalDeathsCovidOrg / totalConfirmedCovidOrg) * 100
  ).slice(0, 5)}%`;
}

function toggle(len = 0, fromSelectStates = true) {
  if (fromSelectStates) {
    let id = "plot-begining";
    let classes = ["active", "grey", "darken-1"];
    let previousElement = document.querySelectorAll("li.active")[0];
    let selectedElement = document.getElementById(id);
    classes.forEach((cls) => {
      previousElement.classList.remove(cls);
      selectedElement.classList.add(cls);
    });
  }

  let name = document.getElementById("my-select").value,
    selectedData = [],
    temp_time_series_data = [];
  if (name != "in") {
    if (len == 0) len = states_daily.length;
    let temp_states_daily = states_daily.slice(
      states_daily.length - len * 3,
      states_daily.length
    );
    for (let i = 0; i < temp_states_daily.length; i += 3) {
      let temp = {};
      temp["date"] = temp_states_daily[i]["date"];
      temp["dailyconfirmed"] = temp_states_daily[i][name];
      temp["dailyrecovered"] = temp_states_daily[i + 1][name];
      temp["dailydeceased"] = temp_states_daily[i + 2][name];
      selectedData.push(JSON.parse(JSON.stringify(temp)));
    }
  } else {
    if (len == 0) len = time_series_data.length;
    temp_time_series_data = time_series_data.slice(
      time_series_data.length - len,
      time_series_data.length
    );
  }
  plotGraph(
    name == "in" ? temp_time_series_data : selectedData,
    window.screen.availWidth <= 650 ? 6 : 14,
    name
  );
}

function fillStateDataTable(res) {
  state_district_data = res;
  let tbody = document.getElementById("state-data-table"),
    inputForm = document.getElementById("my-select-tabulate"),
    tbodyData = "",
    ipFormData = "";
  statewise.slice(1, 6).forEach((data) => {
    tbodyData += `<tr><td>${data["state"]}</td><td>${data["confirmed"]}</td><td>${data["active"]}</td><td>${data["recovered"]}</td><td>${data["deaths"]}</td></tr>`;
  });
  statewise.slice(1).forEach((data) => {
    ipFormData += `<option value="${data["statecode"]}">${data["state"]}</option>`;
  });
  tbody.innerHTML = tbodyData;
  inputForm.innerHTML = ipFormData;
  $(document).ready(function () {
    $("select").formSelect();
  });
  document.getElementById("my-select-tabulate").value = "MH";
  tabulateToggle();
}

function tabulateToggle() {
  if (myChart15) {
    myChart15.destroy();
  }
  name = document.getElementById("my-select-tabulate").value;
  let i = 0;
  while (i < statewise.length && statewise[i]["statecode"] != name) i += 1;
  let dataForCollapsible =
    state_district_data[
      mapper[document.getElementById("my-select-tabulate").value.toLowerCase()]
    ].districtData;
  let htmlForCollapsible = `<li><div class="collapsible-header">Click here for city specific details</div><div class="collapsible-body">`;
  Object.keys(dataForCollapsible).forEach((el) => {
    htmlForCollapsible += `<div class="row" style="border-bottom: 1px solid #97999877;"><div class="col s6">${el}</div><div class="col s6">${dataForCollapsible[el]["confirmed"]}</div></div>`;
  });
  htmlForCollapsible += `</div></li>`;
  document.getElementById("collapsible").innerHTML = htmlForCollapsible;
  let optionsStateSummary = {
    type: "bar",
    data: {
      labels: ["Confirmed", "Active", "Recovered", "Deaths"],
      datasets: [
        {
          label: `${mapper[name.toLowerCase()]}`,
          data: [
            statewise[i]["confirmed"],
            statewise[i]["active"],
            statewise[i]["recovered"],
            statewise[i]["deaths"],
          ],
          backgroundColor: [
            "#223e80a0",
            "#e82727a0",
            "#2adb2aa0",
            "#8f8c8ca0 ",
          ],
          borderColor: ["#223e80ff", "#e82727ff", "#2adb2aff", "#8f8c8cff "],
        },
      ],
    },
    options: {
      responsive: true,
      legend: { display: false },
      title: {
        display: true,
        text: `Covid19 Total Count - ${mapper[name.toLowerCase()]}`,
        fontSize: 14,
      },
      tooltips: { mode: "index", intersect: false },
      hover: { mode: "nearest", intersect: true },
      scales: {
        xAxes: [{ ticks: { fontSize: 12 } }],
        yAxes: [
          {
            ticks: {
              suggestedMin: 0,
              suggestedMax:
                Math.max(
                  statewise[i]["confirmed"],
                  statewise[i]["active"],
                  statewise[i]["recovered"],
                  statewise[i]["deaths"]
                ) + 5,
              fontSize: 12,
              callback: (value) =>
                value > 800 ? String(value / 1000) + "k" : value,
            },
          },
        ],
      },
    },
  };
  if (window.screen.availWidth <= 820) {
    optionsStateSummary.options.title.fontSize = 12;
    optionsStateSummary.options.scales.xAxes[0].ticks.fontSize = 10;
    optionsStateSummary.options.scales.yAxes[0].ticks.fontSize = 10;
  } else if (window.screen.availWidth <= 650) {
    optionsStateSummary.options.title.fontSize = 10;
    optionsStateSummary.options.scales.xAxes[0].ticks.fontSize = 8;
    optionsStateSummary.options.scales.yAxes[0].ticks.fontSize = 8;
  }
  myChart15 = new Chart(ctx15, optionsStateSummary);
}

function changeTimeline(key) {
  let id = "";
  let len = 0;
  if (key == "1") {
    id = "plot-begining";
  } else if (key == "2") {
    id = "plot-2-months";
    len = 60;
  } else if (key == "3") {
    id = "plot-month";
    len = 30;
  }
  let classes = ["active", "grey", "darken-1"];
  let previousElement = document.querySelectorAll("li.active")[0];
  let selectedElement = document.getElementById(id);
  classes.forEach((cls) => {
    previousElement.classList.remove(cls);
    selectedElement.classList.add(cls);
  });
  toggle(len, false);
}

function readData() {
  fetch("https://api.covid19india.org/data.json")
    .catch((err) => fetch("Covid19/json/india.json"))
    .then((res) => res.json())
    .then((res) => {
      entireData = res;
      time_series_data = res.cases_time_series;
      statewise = res.statewise;
      document.getElementById("total-tested").innerText =
        " Total Tests Conducted : " +
        Number(entireData.tested[87]["totalsamplestested"]).toLocaleString();
    })
    .then((res) => fetch("https://api.covid19india.org/states_daily.json"))
    .catch((err) => fetch("Covid19/json/states_daily.json"))
    .then((res) => res.json())
    .then((res) => insertOptionList(res))
    .then((r) => fetch("https://api.covid19india.org/state_district_wise.json"))
    .catch((err) => fetch("Covid19/json/state_district_wise.json"))
    .then((res) => res.json())
    .then((res) => fillStateDataTable(res));
}
