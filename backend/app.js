const apiKey = "sk-q5Nf653a5334aa6dc2721";
// 1. fetch api, get same data
// 2. put in jsonfile (stringify)

const plantArray = [];
const pageNums = [1, 2, 3];
for (const pageNum of pageNums) {
  const fetch = require("node-fetch");
  fetch(`https://perenual.com/api/species-list?key=${apiKey}&page=${pageNum}`)
    .then((res) => res.json())
    .then((json) => {
      plantArray.push(json.data);
      console.log(plantArray.flat());
    });
}

// dropdown based on input, suggests based on input

// on page load, load all plant names
// as user types (onKeyDown), compare input string to match plant names
// allow keyboard arrow to navigate and enter key to select

// const fetch = require("node-fetch");
// const apiUrl = "https://dog.ceo/api/breeds/list/all";
