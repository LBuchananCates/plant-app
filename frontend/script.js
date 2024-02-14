const endpoint = "../backend/data.json";

let plants = [];

function displayPlantListings(plants) {
  // if it exists
  let suggestionsUl = document.querySelector(".suggestions");
  if (suggestionsUl) {
    // then remove lis
    suggestionsUl.textContent = "";
  } else {
    suggestionsUl = document.createElement("ul");
    suggestionsUl.className = "suggestions";
    const searchForm = document.querySelector("#search-form");
    searchForm.appendChild(suggestionsUl);
  }

  plants.forEach((plant) => {
    const plantLi = document.createElement("li");
    plantLi.innerText = plant.commonName;
    suggestionsUl.appendChild(plantLi);
  });
}

function findMatches(input) {
  const regex = new RegExp(input.trim(), "gi");
  return plants.filter((plant) => plant.commonName.match(regex));
}

function handleKeyUp(e) {
  let timer,
    timeoutVal = 3000; // time it takes to wait

  window.clearTimeout(timer);
  timer = window.setTimeout(() => {
    // insert no results div
    console.log("all done typing");
  }, timeoutVal);
}

// fetch json data
fetch(endpoint)
  .then((res) => res.json())
  .then((data) => {
    plants = data;
  });

// as new information typed, update matches WORKS
const input = document.querySelector("#search-input");
let timeout;
input.addEventListener("keyup", (e) => {
  clearTimeout(timeout);
  // Make a new timeout set to go off in 1000ms (1 second)
  timeout = setTimeout(() => {
    const noResultsMsg = document.querySelector(".no-results-found");
    if (noResultsMsg) {
      noResultsMsg.remove();
    }
    // run code when user is done typing
    // go find plants
    const plantMatches = findMatches(input.value);
    if (plantMatches.length > 0) {
      displayPlantListings(plantMatches);
    } else {
      const suggestionsUl = document.querySelector(".suggestions");
      if (suggestionsUl) {
        suggestionsUl.remove();
      }

      // create p
      const noResults = document.createElement("p");
      noResults.innerText = "No results found!";
      noResults.className = "no-results-found";
      const searchForm = document.querySelector("#search-form");
      // append to search form
      searchForm.appendChild(noResults);
    }
  }, 1000);
});
