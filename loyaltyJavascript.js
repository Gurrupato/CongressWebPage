let valorMedioPartyFavorable = 0.0;
let valorMedioPartyContrario = 0.0;
let valorMedioPartyMissed = 0.0;
let numeroDeColumnas = parseInt(document.getElementById("marcadorFilas").value);

function fetchCongress() {
  fetch("Congress.json")
    .then((response) => response.json())
    .then((data) => {
      let congressman = data.results[0].members;
      calculateMediaFavorable(congressman);
      console.log(valorMedioPartyFavorable);
      calculateMediaContra(congressman);
      console.log(valorMedioPartyContrario);
      calculateMediaMissed(congressman);
      console.log(valorMedioPartyMissed);
      makeTable(congressman);
    });
}

function sumar1() {
  numeroDeColumnas = numeroDeColumnas + 1;
  document.getElementById("marcadorFilas").innerHTML = numeroDeColumnas;
  fetchCongress();
}

function restar1() {
  numeroDeColumnas = numeroDeColumnas - 1;
  document.getElementById("marcadorFilas").innerHTML = numeroDeColumnas;
  fetchCongress();
}

function calculateMediaFavorable(counters) {
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

function calculateMediaContra(counters) {
  let mediaFinal = counters.filter(
    (counterOut) =>
      counterOut.votes_against_party_pct != null &&
      !isNaN(counterOut.votes_against_party_pct)
  );
  for (let i = 0; i < mediaFinal.length; i++) {
    valorMedioPartyContrario =
      valorMedioPartyContrario + mediaFinal[i].votes_against_party_pct;
  }
  valorMedioPartyContrario = valorMedioPartyContrario / mediaFinal.length;
}

function calculateMediaMissed(counters) {
  let mediaFinal = counters.filter(
    (counterOut) =>
      counterOut.missed_votes_pct != null && !isNaN(counterOut.missed_votes_pct)
  );
  for (let i = 0; i < mediaFinal.length; i++) {
    valorMedioPartyMissed =
      valorMedioPartyMissed + mediaFinal[i].missed_votes_pct;
  }
  valorMedioPartyMissed = valorMedioPartyMissed / mediaFinal.length;
}

function makeTable(congressmanData) {
  document.getElementById("data-output").innerHTML = "";
  let table = document.getElementById("data-output");
  congressmanData
    .sort((a, b) => b.votes_with_party_pct - a.votes_with_party_pct)
    .filter(
      (congressmanData) =>
        congressmanData.votes_with_party_pct > valorMedioPartyFavorable
      //congressmanData.votes_against_party_pct > valorMedioPartyContrario
      //congressmanData.missed_votes_pct > valorMedioPartyMissed
    );
  for (i = numeroDeColumnas; i > 0; i--) {
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
    let cell12 = row.insertCell(10);
    //put data into table
    cell1.innerHTML = i;
    cell2.innerHTML = congressmanData[i].id;
    cell3.innerHTML = congressmanData[i].first_name;
    cell4.innerHTML = congressmanData[i].last_name;
    cell5.innerHTML = congressmanData[i].state;
    cell6.innerHTML = congressmanData[i].party;
    cell7.innerHTML = congressmanData[i].seniority;
    cell8.innerHTML = congressmanData[i].total_votes;
    cell9.innerHTML = congressmanData[i].missed_votes;
    cell10.innerHTML = congressmanData[i].votes_with_party_pct;
    cell11.innerHTML = congressmanData[i].votes_against_party_pct;
    cell12.innerHTML = congressmanData[i].missed_votes_pct;
  }
}

fetchCongress();
