function createSuggestionsDropdown() {
  const suggestionsUl = document.createElement("ul");
  suggestionsUl.classList.add("suggestions");
  const form = document.querySelector("form");
  form.appendChild(suggestionsUl);
  return suggestionsUl;
}

export function createPageControls(totalPageNum, pages) {
  let pageNum = 1;
  let suggestionsUl = document.querySelector(".suggestions");
  if (!suggestionsUl) createSuggestionsDropdown();

  removeElement(".page-numbers");

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

export function displayPlantListings(plants) {
  let suggestionsUl = document.querySelector(".suggestions");
  if (!suggestionsUl) {
    suggestionsUl = createSuggestionsDropdown();
  } else {
    // get rid of all lis
    const lis = document.querySelectorAll("li");
    suggestionsUl.children;
    lis.forEach((li) => {
      li.remove();
    });
  }

  // put plants into li
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

    suggestionsUl.prepend(plantLi);
  });
}

export function findMatches(input, plants) {
  console.log(input);
  const regex = new RegExp(input.trim(), "gi");
  return plants.filter((plant) => plant.commonName.match(regex));
}

export function groupPages(arr) {
  const pages = [];
  while (arr.length) {
    // push every 15 into array
    pages.push(arr.splice(0, 15));
  }
  return pages;
}

export function removeElement(fish) {
  if (typeof fish === "string" || fish instanceof String) {
    const element = document.querySelector(fish);
    if (element) {
      element.remove();
    }
  } else {
    console.error(
      `Received a ${typeof fish}. Please provide a string instead.`
    );
  }
}
