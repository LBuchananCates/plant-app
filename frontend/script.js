const endpoint = "../backend/data.json";

let plants = [];

function displayPlantListings(plants) {
  let suggestionsUl = document.querySelector(".suggestions");
  if (suggestionsUl) {
    // then remove lis
    suggestionsUl.remove();
  } else {
    const searchForm = document.querySelector("#search-form");
    suggestionsUl = document.createElement("ul");
    suggestionsUl.classList.add("suggestions");
    searchForm.appendChild(suggestionsUl);
  }

  // put plants inyo li
  plants.forEach((plant) => {
    const plantLi = document.createElement("li");
    plantLi.textContent = plant.commonName;
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
    // push every 15 into array
    pages.push(arr.splice(0, 15));
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
      const pages = groupPages(plantMatches);
      // console logged the array pages of plants
      displayPlantListings(pages[0]);

      // for each array displayed: page number and 10 plant names
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

// when click outside,
input.addEventListener("blur", function (e) {
  console.log("lost focus");
  // clear suggestionsUl
  const suggestionsUl = document.querySelector(".suggestions");
  console.log(suggestionsUl);
  if (suggestionsUl) {
    suggestionsUl.remove();
  }
});

// make array of arrays for pagination

// make paginate function that takes array of items, # of items per page, container element to display pagination controls
// function will create and display pagination controls and update the displayed items based on the selected page.
