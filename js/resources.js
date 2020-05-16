let data = [],
  zoneCompleteData = [],
  state_district_wise = {},
  colorForZone = {
    Red: "#ff0d0d",
    Orange: "#ff8a0d",
    Green: "#78d669",
  };

function renderResourcesDetails(resources) {
  data = resources;
  let states = [],
    categories = [],
    stateHTML = `<option value="" disabled selected>Choose your State</option>`,
    categoryHTML = `<option value="All">All</option>`;

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
  const elem = document.querySelector(".collapsible.expandable");
  const instance = M.Collapsible.init(elem, { accordion: false });
  $(document).ready(function () {
    $("select").formSelect();
  });
  document.getElementById("to-be-updated").remove();
}

function updateResourcesTable() {
  const state = document.getElementById("state").value,
    cat = document.getElementById("category").value;
  let listHTML = ``;
  data.forEach((element) => {
    if (element.state == state && (cat == "All" || element.category == cat)) {
      listHTML += `<tr><td><a href="${element.contact}" target="_blank">${element.nameoftheorganisation}</a></td><td>${element.category}</td><td>${element.phonenumber}</td><td>${element.city}</td><td>${element.state}</td></tr>`;
    }
  });
  document.getElementById("list-data").innerHTML = listHTML;
}

function zoneData(zones) {
  zones.forEach((zone) => (state_district_wise[zone.state] = {}));
  zones.forEach(
    (zone) => (state_district_wise[zone.state][zone.district] = zone.zone)
  );

  let data = `<option value="" disabled selected>Choose your State</option>`,
    temp = Object.keys(state_district_wise);
  temp.forEach((t) => (data += `<option value="${t}">${t}</option>`));
  document.getElementById("zone-state").innerHTML = data;
  $(document).ready(function () {
    $("select").formSelect();
  });
}

function selectDistrict() {
  let data = `<option value="" disabled selected>Choose your District</option>`,
    temp = Object.keys(
      state_district_wise[document.getElementById("zone-state").value]
    );

  temp.forEach((t) => (data += `<option value="${t}">${t}</option>`));
  document.getElementById("zone-district").innerHTML = data;
  $(document).ready(function () {
    $("select").formSelect();
  });
}

function updateZoneColor() {
  const state = document.getElementById("zone-state").value;
  const district = document.getElementById("zone-district").value;
  document.getElementById("zone-name-text").innerHTML = `<h5 style="color: ${
    colorForZone[state_district_wise[state][district]]
  } !important; font-weight: bolder;">${
    state_district_wise[state][district]
  }</h5>`;
}

function readData() {
  fetch("https://api.covid19india.org/resources/resources.json")
    .then((res) => res.json())
    .then(({ resources }) => renderResourcesDetails(resources))
    .then((res) => fetch("https://api.covid19india.org/zones.json"))
    .catch((err) => fetch("Covid19/json/zones.json"))
    .then((response) => response.json())
    .then(({ zones }) => zoneData(zones));
}
