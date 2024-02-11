const endpoint = "../backend/data.json";

let plants = [];

// fetch json data
fetch(endpoint)
  .then((res) => res.json())
  .then((data) => {
    plants = data;
  });
// define findMatches to match input value with plants array WORKS
function findMatches(input) {
  return plants.filter((plant) => {
    const regex = new RegExp(input, "gi");
    return plant.commonName.match(regex);
  });
}

// grab user's input
function myInput() {
  // grab input element
  let input = document.getElementById("search");
  // grab value of input element SOMETHING WRONG
  let inputText = input.value;
  input.addEventListener("keyup", (e) => {
    // match inputText by running findMatches
    findMatches(inputText, plants);
  });
}

const searchInput = document.querySelector(".search");
// 5 sec wait works
let timer,
  timeoutVal = 5000; // time it takes to wait
const input = document.querySelector("#search-input");
input.addEventListener("keyup", handleKeyUp);
function handleKeyUp(e) {
  window.clearTimeout(timer);
  timer = window.setTimeout(() => {
    console.log("all done typing");
  }, timeoutVal);
}

// as new information typed, update matches WORKS
searchInput.addEventListener("change", (event) => {
  // how to get input from event
  const matchingPlants = findMatches(event.target.value);
  // display matchingPlants in ul
  displayPlantListings(matchingPlants);
  // if no matching plants in plantarray
  if (matchingPlants.length == 0) {
    // return div below search input "No searches found"
    const noResults = document.createElement("div");
    noResults.innerText = "No results found";
    noResults.setAttribute("class", "no-results-found");
    // append noresults as child to form tag so
    // grab form tag
    const form = document.querySelector("#search-form");
    form.appendChild(noResults);
  }
  // when user changes input, remove list and replace with updated input.value
  console.log(matchingPlants);
});

function displayPlantListings(plants) {
  plants.forEach((plant) => {
    const ul = document.querySelector(".suggestions");

    if (ul) {
      // if existing ul
      const searchForm = document.querySelector("#search-form");
      searchForm.appendChild(ul);
      // then delete existing ul
    } else {
      const newUl = document.createElement("ul");
      newUl.setAttribute("id", "suggestions-ul"); // <ul id="suggestions-ul"> </ul>
      // and add li element to newUl
      const li = document.createElement("li");
      li.innerText = plant.commonName; // <li class="plant-listing"> {plant.commonName}</li>
      li.className = "plant-listing";
      newUl.appendChild(li);
      // searchForm.appendChild(newUl);
    }
  });
}
