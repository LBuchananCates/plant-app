// turn data into array
const endpoint = "../backend/data.json";

// fetch json data
fetch(endpoint)
  .then((res) => res.json())
  // .then((data) => plants.push(...data))
  .then((data) => console.log(data));

// define findMatches function
function findMatches(wordToMatch, plantArray) {
  return plantArray.filter((plantName) => {
    const regex = new RegExp(wordToMatch, "gi");
    return plantName.plant.match(regex);
  });
}

function createBulletList() {
  // grab first 5 plants from data
  // for each plant, =
  // create li with plant names use innerText
  // put inside ul
  // put ul in document.body
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
