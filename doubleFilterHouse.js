let congressmanData = "";
let checkboxes = document.querySelectorAll("input[type=checkbox]");
let setting = [];

function fetchStates() {
  fetch("statesJson.json")
    .then((response) => response.json())
    .then((data) => {
      let states = data;
      makeDropdown(states);
    });
}

fetchStates();

function makeDropdown(statesData) {
  let optionStates = document.getElementById("stateSelector");
  let select = document.getElementById("stateSelector");
  statesData.forEach((elementState) => {
    //create dropdown
    let option1 = document.createElement("option");
    option1.setAttribute("value", elementState.abbreviation);
    let option1Texto = document.createTextNode(elementState.name);
    option1.appendChild(option1Texto);

    select.appendChild(option1);

    document.getElementById("tableStates").appendChild(select);
  });
}

checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    setting = Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
      .filter((i) => i.checked == false) // Use Array.filter to remove unchecked checkboxes.
      .map((i) => i.value); // Use Array.map to extract only the checkbox values from the array of objects.
    console.log(setting);
  });
});

function fetchCongress() {
  fetch("Congress.json")
    .then((response) => response.json())
    .then((data) => {
      let congressman = data.results[0].members;

      makeTable(congressman);
    });
}

function makeTable(congressmanData) {
  document.getElementById("data-output").innerHTML = "";
  let table = document.getElementById("data-output");
  console.log(congressmanData);
  congressmanData
    .filter((congressmanData) => {
      if (document.getElementById("stateSelector").value != "") {
        rsult =
          congressmanData.state ==
          document.getElementById("stateSelector").value;
      } else {
        rsult = true;
      }
      return rsult;
    })
    .filter((congressmanData) => {
      if (setting.length < 3) {
        result1 = congressmanData.party != setting[0];
      } else {
        result1 = true;
      }
      return result1;
    })
    .filter((congressmanData) => {
      if (setting.length < 3) {
        result2 = congressmanData.party != setting[1];
      } else {
        result2 = true;
      }
      return result2;
    })
    .filter((congressmanData) => {
      if (setting.length < 3) {
        result3 = congressmanData.party != setting[2];
      } else {
        result3 = true;
      }
      return result3;
    })
    .forEach((element) => {
      //create table
      let row = table.insertRow(0);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      let cell6 = row.insertCell(5);
      let cell7 = row.insertCell(6);
      let cell8 = row.insertCell(7);
      let cell9 = row.insertCell(8);
      let cell10 = row.insertCell(9);
      let cell11 = row.insertCell(10);
      //put data into table
      cell1.innerHTML = element.id;
      cell2.innerHTML = element.title;
      cell3.innerHTML = element.first_name;
      cell4.innerHTML = element.middle_name;
      cell5.innerHTML = element.last_name;
      cell6.innerHTML = element.state;
      cell7.innerHTML = element.date_of_birth;
      cell8.innerHTML = element.gender;
      cell9.innerHTML = element.party;
      cell10.innerHTML = element.twitter_account;
      cell11.innerHTML = element.seniority;
    });
}

fetchCongress();
