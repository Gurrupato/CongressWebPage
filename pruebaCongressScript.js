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
  congressmanData
    .filter((congressmanData) => {
      if (
        document.getElementById("democratCheckbox").checked === true &&
        document.getElementById("republicanCheckbox").checked === true &&
        document.getElementById("independentCheckbox").checked === true
      ) {
        result = congressmanData.party;
      } else if (
        document.getElementById("democratCheckbox").checked === true &&
        document.getElementById("republicanCheckbox").checked === true
      ) {
        result = congressmanData.party === "D" || congressmanData.party === "R";
      } else if (
        document.getElementById("democratCheckbox").checked === true &&
        document.getElementById("independentCheckbox").checked === true
      ) {
        result =
          congressmanData.party === "D" || congressmanData.party === "ID";
      } else if (
        document.getElementById("independentCheckbox").checked === true &&
        document.getElementById("republicanCheckbox").checked === true
      ) {
        result =
          congressmanData.party === "ID" || congressmanData.party === "R";
      } else if (document.getElementById("democratCheckbox").checked === true) {
        result = congressmanData.party === "D";
      } else if (
        document.getElementById("republicanCheckbox").checked === true
      ) {
        result = congressmanData.party === "R";
      } else if (
        document.getElementById("independentCheckbox").checked === true
      ) {
        result = congressmanData.party === "ID";
      } else {
        result = congressmanData.party;
      }
      return result;
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
