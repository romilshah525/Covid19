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
    .then((res) => {});
}
