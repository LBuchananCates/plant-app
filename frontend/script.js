const endpoint = "../backend/data.json";

let plants = [];

// fetch json data
fetch(endpoint)
  .then((res) => res.json())
  .then((data) => {
    plants = data;
    createPlantListing(data);
  });

// grab user's input
function myInput() {
  // grab input element
  let input = document.getElementById("search");
  // grab value of input element
  let inputText = input.value;
  input.addEventListener("keyup", (e) => {
    // match inputText by running findMatches
    findMatches(inputText, plants);
  });
}

// define findMatches to match input value with plants array
function findMatches(wordToMatch, plants) {
  return plants.filter((plant) => {
    const regex = new RegExp(wordToMatch, "gi");
    return plant.commonName.match(regex);
  });
}

// display matches from previous funciton
function displayMatches() {
  let input = document.getElementById("search");
  let inputText = input.value;
  const matchPlantArray = findMatches(inputText, plants);

  function createPlantListing(info) {
    const ul = document.createElement("ul");
    info.forEach((plant) => {
      const li = document.createElement("li");
      li.innerText = plant.commonName;
      li.className = "plant-listing";
      ul.className = "suggestions";
      ul.appendChild(li);
      // if no match, display nothing
    });
    const form = document.getElementById("search-form");
    form.appendChild(ul);
  }
  createPlantListing(matchPlantArray);
  console.log(matchPlantArray);
  return matchPlantArray;
}

const searchInput = document.querySelector(".search");

// as new information typed, update matches WORKS
searchInput.addEventListener("change", displayMatches);

// function createPlantListing(info) {
//   const ul = document.createElement("ul");
//   info.forEach((plant) => {
//     const li = document.createElement("li");
//     li.innerText = plant.commonName;
//     li.className = "plant-listing";
//     ul.className = "suggestions";
//     ul.appendChild(li);
//   });
//   const form = document.getElementById("search-form");
//   form.appendChild(ul);
// }
