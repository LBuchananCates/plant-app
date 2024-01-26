require("dotenv").config();
const fetch = require("node-fetch");
const fs = require("fs");

const apiKey = process.env.PERENUAL_API_KEY;
const plantArray = [];
const pageNums = [1, 2, 3, 4, 5];

async function getPlantNames() {
  for (const pageNum of pageNums) {
    const response = await fetch(
      `https://perenual.com/api/species-list?key=${apiKey}&page=${pageNum}`
    );
    const json = await response.json();
    const plantNames = json.data.map((plant) => plant.common_name);
    plantArray.push(plantNames);
  }
  const plantTitles = plantArray.flat();
  return plantTitles;
}

getPlantNames().then((names) => {
  const json = JSON.stringify(names);
  const callback = () =>
    console.log(
      `Successfully wrote ${names.length} plant names to JSON file!!`
    );
  fs.writeFile("data.json", json, "utf8", callback);
});
