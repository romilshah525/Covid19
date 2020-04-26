let genderCount = {
  M: 0,
  F: 0,
  "": 0,
};
let entireData;
let ageCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let canvas1 = document.getElementById("canvas1").getContext("2d");
let canvas2 = document.getElementById("canvas2").getContext("2d");
function readData() {
  console.log("Page loaded!");
  fetch("https://api.covid19india.org/raw_data.json")
    // .catch((err) => fetch("Covid19/json/india.json"))
    .then((res) => res.json())
    .then(({ raw_data }) => {
      let age,
        ageNotDisclosed = 0;
      entireData = raw_data;
      raw_data.forEach((element) => {
        console.log(element.agebracket);
        genderCount[element.gender] += 1;
        age = Number(element.agebracket);
        if (element.agebracket == "") {
          ageNotDisclosed += 1;
        } else if (age > 100) {
          ageCount[10] += 1;
        } else if (age > 90) {
          ageCount[9] += 1;
        } else if (age > 80) {
          ageCount[8] += 1;
        } else if (age > 70) {
          ageCount[7] += 1;
        } else if (age > 60) {
          ageCount[6] += 1;
        } else if (age > 50) {
          ageCount[5] += 1;
        } else if (age > 40) {
          ageCount[4] += 1;
        } else if (age > 30) {
          ageCount[3] += 1;
        } else if (age > 20) {
          ageCount[2] += 1;
        } else if (age > 10) {
          ageCount[1] += 1;
        } else {
          ageCount[0] += 1;
        }
      });
      var config1 = {
        type: "doughnut",
        data: {
          datasets: [
            // {
            //   data: [genderCount["M"], genderCount["F"], genderCount[""]],
            //   backgroundColor: ["#eb54e877", "#6354eb77", "#c4cbcc77"],
            //   borderColor:["#eb54e8ff", "#6354ebff", "#c4cbccff"],
            //   borderWidth:[1,1,1],
            // },
            {
              data: [genderCount["M"], genderCount["F"]],
              backgroundColor: ["#eb54e877", "#6354eb77"],
              borderColor: ["#eb54e8ff", "#6354ebff"],
              borderWidth: [1, 1],
            },
          ],
          // labels: ["Male", "Female", `NA-${genderCount[""]}`],
          labels: ["Male", "Female"],
        },
        options: {
          responsive: true,
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: "Patients Count - GenderWise",
          },
          animation: {
            animateScale: true,
            animateRotate: true,
          },
        },
      };
      let chart1 = new Chart(canvas1, config1);
      let config2 = {
        type: "bar",
        data: {
          labels: [
            "0-10",
            "10-20",
            "20-30",
            "30-40",
            "40-50",
            "50-60",
            "60-70",
            "70-80",
            "80-90",
            "90-100",
            "100+",
            // `NA-${ageNotDisclosed}`
          ],
          datasets: [
            {
              label: `Patients`,
              backgroundColor: "#6354eb88",
              borderColor: "#6354ebff",
              borderWidth: 1,
              data: ageCount,
            },
          ],
        },
        options: {
          responsive: true,
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Patient Count - Agewise",
          },
        },
      };
      let chart2 = new Chart(canvas2, config2);
      document.getElementById(
        "canvas1note"
      ).innerText = `Gender values unavailable for ${genderCount[""]} patients.`;
      document.getElementById(
        "canvas2note"
      ).innerText = `Age values unavailable for ${ageNotDisclosed} patients.`;
    });
}
