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
      listHTML += `<tr>
      <td><a href="${element.contact}" target="_blank">${element.nameoftheorganisation}</a></td>
      <td>${element.category}</td>
      <td>${element.phonenumber}</td>
      <td>${element.city}</td>
      <td>${element.state}</td>
  </tr>`;
    }
  });
  document.getElementById("list-data").innerHTML = listHTML;
}
