const endpoint = "../backend/data.json";

let plants = [];

function displayPlantListings(plants) {
  let suggestionsUl = document.querySelector(".suggestions");
  if (suggestionsUl) {
    suggestionsUl.textContent = "";
  } else {
    suggestionsUl = document.createElement("ul");
    suggestionsUl.className = "suggestions";
    const searchForm = document.querySelector("#search-form");
    searchForm.appendChild(suggestionsUl);
  }

  // creating inidvidual plant li
  plants.forEach((plant) => {
    const plantLi = document.createElement("li");
    // define anchor tag for href
    const plantLink = document.createElement("a");
    // use google.com as link example
    const plantPage = "http://google.com";
    plantLink.setAttribute("href", plantPage);
    plantLink.innerHTML = plant.commonName;
    // append a tag to plantLi
    plantLi.appendChild(plantLink);
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

function groupPages(arr) {
  const pages = [];
  while (arr.length) {
    // push every 10 into array
    pages.push(arr.splice(0, 10));
  }
  return pages;
}

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
    // go find plants
    const plantMatches = findMatches(input.value);
    if (plantMatches.length > 0) {
      displayPlantListings(plantMatches);
      const pages = groupPages(plantMatches);
      console.log(pages);
    } else {
      const suggestionsUl = document.querySelector(".suggestions");
      if (suggestionsUl) {
        suggestionsUl.remove();
      }
      const noResults = document.createElement("p");
      noResults.innerText = "No results found!";
      noResults.className = "no-results-found";
      const searchForm = document.querySelector("#search-form");
      searchForm.appendChild(noResults);
    }
  }, 1000);
});

// make array of arrays for pagination

// make paginate function that takes array of items, # of items per page, container element to display pagination controls
// function will create and display pagination controls and update the displayed items based on the selected page.
