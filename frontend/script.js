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
    // plantLi.innerText = plant.commonName;
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
    // go find plants
    const plantMatches = findMatches(input.value);
    if (plantMatches.length > 0) {
      displayPlantListings(plantMatches);
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
// make little buttons for the pages
function paginate(items, itemsPerPage, paginationContainer) {
  let currentPage = 1;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  function showItems(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = items.slice(startIndex, endIndex);

    const itemsContainer = document.querySelector("#items");
    itemsContainer.innerHTML = "";

    pageItems.forEach((item) => {
      const li = document.createElement("li");
      li.innerText = item;
      itemsContainer.appendChild(li);
    });
  }

  function setupPagination() {
    const pagination = document.querySelector(paginationContainer);
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const link = document.createElement("a");
      link.href = "#";
      link.innerText = i;

      if (i === currentPage) {
        link.classList.add("active");
      }

      link.addEventListener("click", (event) => {
        event.preventDefault();
        currentPage = i;
        showItems(currentPage);

        const currentActive = pagination.querySelector(".active");
        currentActive.classList.remove("active");
        link.classList.add("active");
      });

      pagination.appendChild(link);
    }
  }

  showItems(currentPage);
  setupPagination();
}
