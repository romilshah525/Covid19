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
  myChart15;

const ctx11 = document.getElementById("myChart11").getContext("2d"),
  ctx15 = document.getElementById("myChart15").getContext("2d");

function readData() {
  fetch("https://api.covid19india.org/data.json")
    .catch((err) => fetch("Covid19/json/india.json"))
    .then((res) => res.json())
    .then((res) => {
      entireData = res;
      time_series_data = res.cases_time_series;
      statewise = res.statewise;
    })
    .then((res) => fetch("https://api.covid19india.org/states_daily.json"))
    .catch((err) => fetch("Covid19/json/states_daily.json"))
    .then((res) => res.json())
    .then((res) => {
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
      document.getElementById("to-be-updated").innerHTML = `<div class="col s6">
                                                                <h6 class="black-text right">Last Updated At</h6>
                                                              </div>
                                                              <div class="col s6">
                                                                <h6 class="black-text left">${statewise[0]["lastupdatedtime"]}</h6>
                                                            </div>`;
      document.getElementById("my-select").value = "in";
      if (window.screen.availWidth <= 650) plotGraph(time_series_data, 6, "in");
      else plotGraph(time_series_data, 14, "in");
      $(document).ready(function () {
        $("select").formSelect();
      });
      fillStateDataTable();
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
        Number(element["dailyconfirmed"]) -
          (Number(element["dailyrecovered"]) + Number(element["dailydeceased"]))
      );
    }
  } else {
    data.forEach((element) => {
      date.push(element["date"].slice(0, 6));
      confirmed.push(Number(element["dailyconfirmed"]));
      deceased.push(Number(element["dailydeceased"]));
      recovered.push(Number(element["dailyrecovered"]));
      let t =
        Number(element["dailyconfirmed"]) -
        (Number(element["dailyrecovered"]) + Number(element["dailydeceased"]));
      active.push(t < 0 ? 0 : t);
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
          data: deceased,
          fill: false,
          backgroundColor: "#8f8c8ca0",
          hoverBorderColor: "#8f8c8cff",
          borderColor: "#8f8c8cf0",
        },
      ],
    },
    type: "line",
    options: {
      responsive: true,
      legend: {
        position: "bottom",
        labels: { fontColor: "#223e80ff", fontSize: size },
      },
      title: {
        display: true,
        text: `Covid19 Confirmed Daily Count - ${name}`,
        fontSize: size + 4,
      },
      tooltips: { mode: "index", intersect: false },
      hover: { mode: "nearest", intersect: true },
      chartArea: { backgroundColor: "#223e8011" },
      scales: {
        xAxes: [{}],
        yAxes: [{}],
      },
    },
  };
  myChart11 = new Chart(ctx11, optionsIndiaData);
  element = statewise.filter((el) => el["statecode"] == ct.toUpperCase())[0];
  total = element.confirmed;
  totalActiveCovidOrg = element.active;
  totalConfirmedCovidOrg = element.confirmed;
  totalDeathsCovidOrg = element.deaths;
  totalReceoveredCovidOrg = element.recovered;
  document.getElementById(
    "total-confirmed-cases"
  ).innerText = `Positive Cases: ${totalConfirmedCovidOrg}`;
  document.getElementById(
    "total-recovered-cases"
  ).innerText = `Recovered Cases: ${totalReceoveredCovidOrg}`;
  document.getElementById(
    "total-active-cases"
  ).innerText = `Active Cases: ${totalActiveCovidOrg}`;
  document.getElementById(
    "total-death-cases"
  ).innerText = `Death Cases: ${totalDeathsCovidOrg}`;

  document.getElementById("recovery-rate").innerText = `Recovery Rate: ${String(
    (totalReceoveredCovidOrg / totalConfirmedCovidOrg) * 100
  ).slice(0, 5)}%`;
  document.getElementById("death-rate").innerText = `Death Rate: ${String(
    (totalDeathsCovidOrg / totalConfirmedCovidOrg) * 100
  ).slice(0, 5)}%`;
}

function toggle() {
  name = document.getElementById("my-select").value;
  if (name != "in") {
    selectedData = [];
    for (let i = 0; i < states_daily.length; i += 3) {
      let temp = {};
      temp["date"] = states_daily[i]["date"];
      temp["dailyconfirmed"] = states_daily[i][name];
      temp["dailyrecovered"] = states_daily[i + 1][name];
      temp["dailydeceased"] = states_daily[i + 2][name];
      selectedData.push(JSON.parse(JSON.stringify(temp)));
    }
  }
  if (window.screen.availWidth <= 650)
    plotGraph(name == "in" ? time_series_data : selectedData, 6, name);
  else plotGraph(name == "in" ? time_series_data : selectedData, 14, name);
}

function fillStateDataTable() {
  let tbody = document.getElementById("state-data-table"),
    inputForm = document.getElementById("my-select-tabulate"),
    tbodyData = "",
    ipFormData = "";
  statewise.slice(1, 6).forEach((data) => {
    tbodyData += `<tr>
                    <td>${data["state"]}</td>
                    <td>${data["confirmed"]}</td>
                    <td>${data["active"]}</td>
                    <td>${data["recovered"]}</td>
                    <td>${data["deaths"]}</td>
                  </tr>`;
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
  let tbody = document.getElementById("dynamic-summary-tabulate");
  tbodyData = tbody.innerHTML = `<tr>
                                  <td class="truncate">${statewise[i]["state"]}</td>
                                  <td class="blue-text text-darken-4">${statewise[i]["confirmed"]}</td>
                                  <td class="my-red-text">${statewise[i]["active"]}</td>
                                  <td class="light-green-text text-accent-3">${statewise[i]["recovered"]}</td>
                                  <td class="grey-text text-darken-4">${statewise[i]["deaths"]}</td>
                                </tr>`;
  let optionsStateSummary = {
    type: "bar",
    data: {
      labels: ["Confirmed", "Active", "Deaths", "Recovered"],
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
      legend: {
        position: "bottom",
        labels: { fontColor: "#000", fontSize: 12 },
      },
      title: {
        display: true,
        text: `Covid19 Total Count - ${mapper[name.toLowerCase()]}`,
        fontSize: 16,
      },
      tooltips: { mode: "index", intersect: false },
      hover: { mode: "nearest", intersect: true },
      scales: {
        xAxes: [{}],
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
            },
          },
        ],
      },
    },
  };
  myChart15 = new Chart(ctx15, optionsStateSummary);
}
