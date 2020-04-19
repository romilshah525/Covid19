let data = [];
function readData() {
  fetch("https://api.covid19india.org/resources/resources.json")
    .catch((err) => fetch("Covid19/json/resources.json"))
    .then((res) => res.json())
    .then((res) => {
      data = res.resources;
      res = data;
      let states = [];
      let categories = [];
      let categoryHTML = `<option value="All">All</option>`;
      let stateHTML = "";
      res.forEach((element) => {
        states.push(element.state);
        categories.push(element.category);
      });
      states = [...new Set(states)];
      categories = [...new Set(categories)];
      categories.forEach(
        (cat) => (categoryHTML += `<option value="${cat}">${cat}</option>`)
      );
      states.forEach(
        (st) => (stateHTML += `<option value="${st}">${st}</option>`)
      );
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
      update();
    });
}
function update() {
  let state = document.getElementById("state").value;
  let cat = document.getElementById("category").value;
  let listHTML = ``;
  data.forEach((element) => {
    if (element.state == state && (cat == "All" || element.category == cat)) {
      listHTML += ` <li>
            <div class="collapsible-header">
            <span>${element.state}</span>
        </div>
        <div class="collapsible-body row">
            <h6 class="col s12 m6 flow-text"><a href="${element.contact}" target="_blank">${element.nameoftheorganisation}</a></h6>
            <h6 class="col s12 m6 flow-text">Category:${element.category}</h6>
            <h6 class="col s12 m6 flow-text">City:${element.city}</h6>
            <h6 class="col s12 m6 flow-text">Contact: ${element.phonenumber}</h6>
            <p class="col s12">${element.descriptionandorserviceprovided}</p>
        </div>
    </li>`;
    }
  });
  document.getElementById("list-data").innerHTML = listHTML;
}
