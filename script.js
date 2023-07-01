// Api fetch puuid
function api(name, tag) {
  const errorHeading = document.querySelector(".valo-error");
  fetch(`https://api.henrikdev.xyz/valorant/v1/account/${name}/${tag}`)
    .then((response) => response.json())
    .then((data) => {
      if (errorHeading.style.display === "block") {
        errorHeading.style.display = "none";
      }
      console.log(data.data.puuid);
      match(data.data.puuid);
    })
    .catch((error) => {
      // Handle any errors that occur during the request
      errorHeading.style.display = "block";
    });
}

// Api fetch match details
function match(id) {
  fetch(
    `https://api.henrikdev.xyz/valorant/v1/by-puuid/lifetime/matches/ap/${id}`
  )
    .then((response) => response.json())
    .then((data) => {
      const resultsContainer = document.querySelector('.valo-show');

      for (let i = 0; i < 6; i++) {
        // newly created div
        const createdDiv = document.createElement('div');
        createdDiv.classList.add('valo-created-div');

        const titleDetails = document.createElement('h1');
        titleDetails.textContent = `Recent Match History ${i+1}`;
        titleDetails.classList.add('valo-created-title');
        createdDiv.appendChild(titleDetails);

        const resultDetails = document.createElement('h1');
        resultDetails.textContent = `13 Victory 12`;
        resultDetails.classList.add('valo-created-result');
        createdDiv.appendChild(resultDetails);

        const matchDetails = document.createElement('h1');
        matchDetails.textContent = `Map: ${data.data[i].meta.map.name}`;
        createdDiv.appendChild(matchDetails);

        const rankDetails = document.createElement('h1');
        rankDetails.textContent = `Rank: ${data.data[i].meta.mode}`;
        createdDiv.appendChild(rankDetails);

        const dateDetails = document.createElement('h1');
        dateDetails.textContent = `Date: ${data.data[i].meta.started_at}`;
        createdDiv.appendChild(dateDetails);

        const serverDetails = document.createElement('h1');
        serverDetails.textContent = `Server: ${data.data[i].meta.cluster}`;
        createdDiv.appendChild(serverDetails);

        const teamDetails = document.createElement('h1');
        teamDetails.textContent = `Rank: ${data.data[i].stats.team}`;
        createdDiv.appendChild(teamDetails);

        resultsContainer.appendChild(createdDiv);

      }

      let agent = data.data[0].stats.character.name;
      let tier = data.data[0].stats.tier;
      let score = data.data[0].stats.score;
      let kill = data.data[0].stats.kills;
      let death = data.data[0].stats.deaths;
      let assist = data.data[0].stats.assists;
      let head = data.data[0].stats.shots.head;
      let body = data.data[0].stats.shots.body;
      let leg = data.data[0].stats.shots.leg;
      let made = data.data[0].stats.damage.made;
      let received = data.data[0].stats.damage.received;
      let red = data.data[0].teams.red;
      let blue = data.data[0].teams.blue;

    });
}

// From input save
const form = document.querySelector(".valo-form");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting and refreshing the page

  const inGameNameInput = document.querySelector(
    ".valo-input.text-in:nth-of-type(1)"
  );
  const tagInput = document.querySelector(".valo-input.text-in:nth-of-type(2)");

  const inGameName = inGameNameInput.value;
  const tag = tagInput.value;

  api(inGameName, tag);

  // Clear the input fields if desired
  inGameNameInput.value = "";
  tagInput.value = "";
});
