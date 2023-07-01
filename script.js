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
      const resultsContainer = document.querySelector(".valo-show");

      for (let i = 0; i < 9; i++) {
        // newly created div
        const createdDiv = document.createElement("div");
        createdDiv.classList.add("valo-match");

        const titleDetails = document.createElement("h1");
        titleDetails.textContent = `Recent Match History ${i + 1}`;
        titleDetails.classList.add("valo-created-title");
        createdDiv.appendChild(titleDetails);

        let red = data.data[i].teams.red;
        let blue = data.data[i].teams.blue;
        let team = data.data[i].stats.team;
        let result = "";

        if (red !== null && blue !== null) {
          if (team === "Blue") {
            if (Number(red) > Number(blue)) {
              result = `<span class="blue-team">${blue}</span> Defeat <span class="red-team">${red}</span>`;
            } else if (Number(red) === Number(blue)) {
              result = `<span class="blue-team">${blue}</span> Draw <span class="red-team">${red}</span>`;
            } else {
              result = `<span class="blue-team">${blue}</span> Victory <span class="red-team">${red}</span>`;
            }
          } else {
            if (Number(red) < Number(blue)) {
              result = `<span class="red-team">${red}</span> Defeat <span class="blue-team">${blue}</span>`;
            } else if (Number(red) === Number(blue)) {
              result = `<span class="red-team">${red}</span> Draw <span class="blue-team">${blue}</span>`;
            } else {
              result = `<span class="red-team">${red}</span> Victory <span class="blue-team">${blue}</span>`;
            }
          }
        } else {
          continue;
        }

        const resultDetails = document.createElement("h1");
        resultDetails.innerHTML = `${result}`;
        resultDetails.classList.add("valo-created-result");
        createdDiv.appendChild(resultDetails);

        const matchDetails = document.createElement("h1");
        matchDetails.textContent = `Map: ${data.data[i].meta.map.name}`;
        createdDiv.appendChild(matchDetails);

        const rankDetails = document.createElement("h1");
        rankDetails.textContent = `Rank: ${data.data[i].meta.mode}`;
        createdDiv.appendChild(rankDetails);

        const date = data.data[i].meta.started_at;
        const dateDetails = document.createElement("h1");
        dateDetails.textContent = `Date: ${date.substring(0, 10)}`;
        createdDiv.appendChild(dateDetails);

        const serverDetails = document.createElement("h1");
        serverDetails.textContent = `Server: ${data.data[i].meta.cluster}`;
        createdDiv.appendChild(serverDetails);

        const teamDetails = document.createElement("h1");
        teamDetails.textContent = `Team: ${data.data[i].stats.team}`;
        createdDiv.appendChild(teamDetails);

        const agentDetails = document.createElement("h1");
        agentDetails.textContent = `Agent: ${data.data[i].stats.character.name}`;
        createdDiv.appendChild(agentDetails);

        const tierDetails = document.createElement("h1");
        tierDetails.textContent = `Tier: ${data.data[i].stats.tier}`;
        createdDiv.appendChild(tierDetails);

        const scoreDetails = document.createElement("h1");
        scoreDetails.textContent = `Score: ${data.data[i].stats.score}`;
        createdDiv.appendChild(scoreDetails);

        const killDetails = document.createElement("h1");
        killDetails.textContent = `Kills: ${data.data[i].stats.kills}`;
        createdDiv.appendChild(killDetails);

        const bodyDetails = document.createElement("h1");
        bodyDetails.textContent = `Body: ${data.data[i].stats.shots.body}`;
        createdDiv.appendChild(bodyDetails);

        const deathDetails = document.createElement("h1");
        deathDetails.textContent = `Deaths: ${data.data[i].stats.deaths}`;
        createdDiv.appendChild(deathDetails);

        const headDetails = document.createElement("h1");
        headDetails.textContent = `Head: ${data.data[i].stats.shots.head}`;
        createdDiv.appendChild(headDetails);

        const assistDetails = document.createElement("h1");
        assistDetails.textContent = `Assists: ${data.data[i].stats.assists}`;
        createdDiv.appendChild(assistDetails);

        const legDetails = document.createElement("h1");
        legDetails.textContent = `Leg: ${data.data[i].stats.shots.leg}`;
        createdDiv.appendChild(legDetails);

        const madeDetails = document.createElement("h1");
        madeDetails.textContent = `Made: ${data.data[i].stats.damage.made}`;
        createdDiv.appendChild(madeDetails);

        const receivedDetails = document.createElement("h1");
        receivedDetails.textContent = `Received: ${data.data[i].stats.damage.received}`;
        createdDiv.appendChild(receivedDetails);

        resultsContainer.appendChild(createdDiv);
      }
    });
}

// From input save
const form = document.querySelector(".valo-form");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting and refreshing the page

  // Get the element with the class "valo-show"
  const valoShow = document.querySelector(".valo-show");

  // Check if the element has any child nodes
  if (valoShow.hasChildNodes()) {
    // Remove all child nodes from the element
    while (valoShow.firstChild) {
      valoShow.removeChild(valoShow.firstChild);
    }
  }

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

// Github star count show
document.addEventListener("DOMContentLoaded", function () {
  // GitHub repository information
  const owner = "Chy-Zaber-Bin-Zahid";
  const repo = "Valorant-Macth-Tracker";

  // API endpoint for retrieving repository information
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;

  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();
  xhr.open("GET", apiUrl);

  // Set the response type to JSON
  xhr.responseType = "json";

  xhr.onload = function () {
    if (xhr.status === 200) {
      const starCount = xhr.response.stargazers_count;

      // Display the star count on the webpage
      const starCountElement = document.getElementById("star-count");
      starCountElement.textContent = `⭐ ${starCount}`;
    } else {
      console.log("Failed to retrieve star count.");
    }
  };

  // Send the request
  xhr.send();
});
