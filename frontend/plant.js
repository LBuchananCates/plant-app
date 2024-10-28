const params = new URLSearchParams(document.location.search);
const main = document.querySelector("main");

// to do
// 1. put plant name into h1
const heading = document.createElement("h1");
heading.className = "heading__plant-name";
// styles
heading.style.color = "#957498";
heading.style.padding = "30px 60px";

const plantName = params.get("plantName");
heading.innerText = plantName;
main.appendChild(heading);

// 2. put plant scientific name into p
const scientificNameParagraph = document.createElement("p");
scientificNameParagraph.style.padding = "0px 60px";
// assign class name
const scientificName = params.get("scientificName");
scientificNameParagraph.style.fontStyle = "italic";
scientificNameParagraph.innerText = scientificName;
main.appendChild(scientificNameParagraph);

// 3. put plant watering into p
const wateringParagraph = document.createElement("p");
wateringParagraph.style.padding = "0px 60px";
// assign class name
const watering = params.get("watering");
wateringParagraph.style.color = "blue";
wateringParagraph.innerText = `Watering schedule: ${watering}`;
main.appendChild(wateringParagraph);

// 4. put plant sunlight into p
const sunlightParagraph = document.createElement("p");
sunlightParagraph.style.padding = "0px 60px";
// assign class name
let sunlight = params.getAll("sunlight");
sunlight = sunlight.join(", ");
sunlightParagraph.innerText = `Sunlight: ${sunlight}`;
main.appendChild(sunlightParagraph);
