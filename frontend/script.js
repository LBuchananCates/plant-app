import {
  createPageControls,
  displayPlantListings,
  findMatches,
  groupPages,
  removeElement,
} from "./functions.js";

const endpoint = "../backend/data.json";
let plants = [];

// fetch json data
fetch(endpoint)
  .then((res) => res.json())
  .then((data) => {
    plants = data;
  });

// When user stops typing, find plants and show suggestions
let timeout;
const input = document.querySelector("#search-input");
input.addEventListener("keyup", (e) => {
  // When user stops typing...
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    // Check for previous "No Results" message
    removeElement(".no-results-found");

    // Match plants to user input
    if (input.value.trim()) {
      const plantMatches = findMatches(input.value, plants);
      if (plantMatches.length > 0) {
        const pages = groupPages(plantMatches);
        displayPlantListings(pages[0]);
        createPageControls(pages.length, pages);
      } else {
        // Check for previous "Suggestions" ul
        removeElement(".suggestions");

        // Displays that no results were found
        const noResults = document.createElement("p");
        noResults.innerText = "No results found!";
        noResults.className = "no-results-found";
        const searchForm = document.querySelector("#search-form");
        searchForm.appendChild(noResults);
      }
    }
  }, 1000);
});

// when click outside,
// input.addEventListener("blur", function (e) {
//   console.log("lost focus");
//   // clear suggestionsUl
//   const suggestionsUl = document.querySelector(".suggestions");
//   if (suggestionsUl) {
//     suggestionsUl.remove();
//   }
// });
