const endpoint = "../backend/data.json";

// fetch json data
fetch(endpoint)
  .then((res) => res.json())
  .then((data) => {
    createPlantListing(data);
  });

// define findMatches function
function findMatches(wordToMatch, plantArray) {
  return plantArray.filter((plantName) => {
    const regex = new RegExp(wordToMatch, "gi");
    return plantName.plant.match(regex);
  });
}

let plants = [];

// create plant listing
function createPlantListing(info) {
  console.log(info);
  // create li with plant names use innerText
  const plantLi = document.createElement("li");
  plantLi.innerText = info[(0, 1)].commonName;
  plantLi.className = "plant-listing";
  // create ul
  const newUl = document.createElement("ul");
  // append plantLi to newUl
  newUl.append(plantLi);
  // append newUl to form in main
  const form = document.getElementById("search-form");
  form.append(newUl);
}

// display matches from previous funciton
function displayMatches() {
  //   const matchArray = findMatches(this.value, plants);
  console.log(this.value);
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

// as new information typed, update matches WORKS
searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
