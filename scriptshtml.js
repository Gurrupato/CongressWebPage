fetch("Senate.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (senators) {
    let placeholder = document.querySelector("#data-output");
    let out = "";
    for (let senator of senators) {
      out += `
    <tr>
        <td>${senator.id}</td>
        <td>${senator.title}</td> 
        <td>${senator.short_title}</td> 
        <td>${senator.first_name}</td> 
        <td>${senator.middle_name}</td> 
        <td>${senator.last_name}</td> 
        <td>${senator.date_of_birth}</td> 
        <td>${senator.gender}</td> 
        <td>${senator.party}</td> 
        <td><a href="${senator.twitter_account}">${senator.twitter_account}</a></td> 
        <td><a href="${senator.facebook_account}">${senator.facebook_account}</a></td> 
        <td><a href="${senator.youtube_account}">${senator.youtube_account}</a></td> 
        <td>${senator.govtrack_id}</td>  
        <td>${senator.icpsr_id}</td> 
        <td>${senator.seniority}</td> 
    </tr>  
    `;
    }
    placeholder.innerHTML = out;
  });
