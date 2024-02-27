const endpoint = "../backend/data.json";

let plants = [];

function createPageControls(totalPageNum, pages) {
  let pageNum = 1;
  const suggestionsUl = document.querySelector(".suggestions");

  // create li
  const pageControls = document.createElement("div");
  pageControls.classList.add("page-numbers");

  // create left button
  const leftButton = document.createElement("button");
  leftButton.classList.add("page-control__button");
  leftButton.innerText = "<<<";

  // event listener left
  leftButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (pageNum > 1) {
      pageNum--;
      pee.innerText = `${pageNum} of ${totalPageNum}`;
      displayPlantListings(pages[pageNum - 1]);
    }
  });

  // create pee
  const pee = document.createElement("p");
  pee.innerText = `${pageNum} of ${totalPageNum}`;

  // create right button
  const rightButton = document.createElement("button");
  rightButton.classList.add("page-control__button");
  rightButton.innerText = ">>>";

  // event listener right
  rightButton.addEventListener("click", (event) => {
    event.preventDefault();
    const isLastPage = totalPageNum === pageNum;
    if (!isLastPage) {
      pageNum++;
      pee.innerText = `${pageNum} of ${totalPageNum}`;
      displayPlantListings(pages[pageNum - 1]);
    }
  });

  // append arrows to page num li
  pageControls.prepend(leftButton);
  // p
  pageControls.appendChild(pee);
  pageControls.appendChild(rightButton);

  suggestionsUl.appendChild(pageControls);
}

function displayPlantListings(plants) {
  let suggestionsUl = document.querySelector(".suggestions");
  // get rid of all lis
  const lis = document.querySelectorAll("li");
  suggestionsUl.children;
  lis.forEach((li) => {
    li.remove();
  });
  // put plants inyo li
  plants.forEach((plant) => {
    const plantLi = document.createElement("li");
    plantLi.textContent = plant.commonName;
    suggestionsUl.prepend(plantLi);
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

      createPageControls(pages.length, pages);

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

// if suggestionsUl, create buttons

// when click outside,
// input.addEventListener("blur", function (e) {
//   console.log("lost focus");
//   // clear suggestionsUl
//   const suggestionsUl = document.querySelector(".suggestions");
//   console.log(suggestionsUl);
//   if (suggestionsUl) {
//     suggestionsUl.remove();
//   }
// });
