let data = [],
  zoneCompleteData = [],
  districtZoneColorData = {},
  colorForZone = {
    Red: "#ff0d0d",
    Orange: "#ff8a0d",
    Green: "#78d669",
  };

function readData() {
  fetch("https://api.covid19india.org/resources/resources.json")
    .then((res) => res.json())
    .then(({ resources }) => renderResourcesDetails(resources))
    .then((res) => fetch("https://api.covid19india.org/zones.json"))
    .catch((err) => fetch("Covid19/json/zones.json"))
    .then((response) => response.json())
    .then(({ zones }) => zoneUpdate(zones));
}

function renderResourcesDetails(resources) {
  data = resources;
  let states = [];
  let categories = [];
  let categoryHTML = `<option value="All">All</option>`;
  let stateHTML = "";
  resources.forEach((element) => {
    states.push(element.state);
    categories.push(element.category);
  });
  states = [...new Set(states)];
  categories = [...new Set(categories)];
  categories.forEach(
    (cat) => (categoryHTML += `<option value="${cat}">${cat}</option>`)
  );
  states.forEach((st) => (stateHTML += `<option value="${st}">${st}</option>`));
  document.getElementById("category").innerHTML = categoryHTML;
  document.getElementById("state").innerHTML = stateHTML;
  var elem = document.querySelector(".collapsible.expandable");
  var instance = M.Collapsible.init(elem, {
    accordion: false,
  });
  $(document).ready(function () {
    $("select").formSelect();
  });
  document.getElementById("to-be-updated").innerHTML = ``;
  document.getElementById("state").value = "Andaman & Nicobar";
  updateResourcesTable();
}

function zoneUpdate(zones) {
  zoneCompleteData = zones;
  function GetSortOrder(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) return 1;
      else if (a[prop] < b[prop]) return -1;
      return 0;
    };
  }
  zones.sort(GetSortOrder("district"));
  let data = ``;
  zones.forEach((zone) => {
    data += `<option value="${zone.districtcode}">${zone.district}</option>`;
    districtZoneColorData[zone.districtcode] = zone.zone;
  });
  let selectHTML = document.getElementById("zone-state");
  selectHTML.innerHTML = data;
  $(document).ready(function () {
    $("select").formSelect();
  });
  updateZoneColor();
}

function updateResourcesTable() {
  let state = document.getElementById("state").value;
  let cat = document.getElementById("category").value;
  let listHTML = ``;
  data.forEach((element) => {
    if (element.state == state && (cat == "All" || element.category == cat)) {
      listHTML += `<tr><td><a href="${element.contact}" target="_blank">${element.nameoftheorganisation}</a></td><td>${element.category}</td><td>${element.phonenumber}</td><td>${element.city}</td><td>${element.state}</td></tr>`;
    }
  });
  document.getElementById("list-data").innerHTML = listHTML;
}

function updateZoneColor() {
  let value = document.getElementById("zone-state").value;
  document.getElementById("zone-name-text").innerHTML = `<h5 style="color: ${
    colorForZone[districtZoneColorData[value]]
  } !important; font-weight: bolder;">${districtZoneColorData[value]}</h5>`;
}
