// Api fetch
fetch("https://api.henrikdev.xyz/valorant/v1/account/Saitama47/4747")
  .then(response => response.json())
  .then(data => {
    console.log(data.data.puuid);
  })