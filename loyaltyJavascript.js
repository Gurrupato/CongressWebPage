let valorMedioPartyFavorable = 0.0;

function fetchCongress() {
  fetch("Congress.json")
    .then((response) => response.json())
    .then((data) => {
      let congressman = data.results[0].members;
      calculateMedian(congressman);
      console.log(valorMedioPartyFavorable);
      makeTable(congressman);
    });
}

function calculateMedian(counters) {
  let mediaFinal = counters.filter(
    (counterOut) =>
      counterOut.votes_with_party_pct != null &&
      !isNaN(counterOut.votes_with_party_pct)
  );
  for (let i = 0; i < mediaFinal.length; i++) {
    valorMedioPartyFavorable =
      valorMedioPartyFavorable + mediaFinal[i].votes_with_party_pct;
  }
  valorMedioPartyFavorable = valorMedioPartyFavorable / mediaFinal.length;
}

function makeTable(congressmanData) {
  document.getElementById("data-output").innerHTML = "";
  let table = document.getElementById("data-output");

  congressmanData
    .sort((a, b) => a.votes_with_party_pct - b.votes_with_party_pct)
    .filter(
      (congressmanData) =>
        congressmanData.votes_with_party_pct > valorMedioPartyFavorable
    )
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
      cell2.innerHTML = element.first_name;
      cell3.innerHTML = element.last_name;
      cell4.innerHTML = element.state;
      cell5.innerHTML = element.party;
      cell6.innerHTML = element.seniority;
      cell7.innerHTML = element.total_votes;
      cell8.innerHTML = element.missed_votes;
      cell9.innerHTML = element.votes_with_party_pct;
      cell10.innerHTML = element.votes_against_party_pct;
      cell11.innerHTML = element.missed_votes_pct;
    });
}

fetchCongress();
