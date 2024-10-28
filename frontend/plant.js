const params = new URLSearchParams(document.location.search);
const main = document.querySelector("main");

// RETURN BUTTON
const returnBtn = document.getElementById("btn__return");
returnBtn.style.margin = "40px 60px";
// when click button, redirect to index.html
returnBtn.addEventListener("click", function (event) {
  console.log("hello world");
});

// PLANT HEADING
const heading = document.createElement("h1");
heading.className = "heading__plant-name";
// styles
heading.style.fontSize = "36px";
heading.style.color = "#957498";
heading.style.padding = "10px 60px";
// assign classname
const plantName = params.get("plantName");
heading.innerText = plantName;
main.appendChild(heading);

// LATIN NAME
const scientificNameParagraph = document.createElement("p");
// styling
scientificNameParagraph.style.fontStyle = "italic";
scientificNameParagraph.style.padding = "0px 60px";
// assign class name
const scientificName = params.get("scientificName");
scientificNameParagraph.innerText = scientificName;
main.appendChild(scientificNameParagraph);

// WATERING
const wateringParagraph = document.createElement("p");
// styling
wateringParagraph.style.color = "blue";
wateringParagraph.style.padding = "0px 60px";
// assign class name
const watering = params.get("watering");
wateringParagraph.innerText = `Watering schedule: ${watering}`;
main.appendChild(wateringParagraph);

// SUNLIGHT
const sunlightParagraph = document.createElement("p");
// styling
sunlightParagraph.style.padding = "0px 60px";
// assign class name
let sunlight = params.getAll("sunlight");
sunlight = sunlight.join(", ");
sunlightParagraph.innerText = `Sunlight: ${sunlight}`;
main.appendChild(sunlightParagraph);
