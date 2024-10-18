const params = new URLSearchParams(document.location.search);
const main = document.querySelector("main");

// to do
// 1. put plant name into h1
const heading = document.createElement("h1");
const plantName = params.get("plantName");
heading.innerText = plantName;
main.appendChild(heading);

// 2. put plant scientific name into p
const scientificNameParagraph = document.createElement("p");
const scientificName = params.get("scientificName");
scientificNameParagraph.style.fontStyle = "italic";
scientificNameParagraph.innerText = scientificName;
main.appendChild(scientificNameParagraph);

// 3. put plant watering into p
const wateringParagraph = document.createElement("p");
const watering = params.get("watering");
wateringParagraph.style.color = "blue";
wateringParagraph.innerText = `Watering schedule: ${watering}`;
main.appendChild(wateringParagraph);

// 4. put plant sunlight into p
const sunlightParagraph = document.createElement("p");
let sunlight = params.getAll("sunlight");
sunlight = sunlight.join(", ");
sunlightParagraph.innerText = `Sunlight: ${sunlight}`;
main.appendChild(sunlightParagraph);
