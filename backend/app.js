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

    // return one array of objects
    // ** map returns an array, isn't destructive
    // map over data
    // write function inside of map that returns smth that all goes inside array
    // inside map function, return an object
    const plants = json.data.map((plant) => {
      console.log(plant);
      // returning object
      return {
        commonName: plant.common_name,
        scientificName: plant.scientific_name[0],
        watering: plant.watering,
        sunlight: plant.sunlight,
      };
    });
    plantArray.push(plants);
  }
  return plantArray.flat();
}

getPlantNames().then((names) => {
  const json = JSON.stringify(names);
  const callback = () =>
    console.log(
      `Successfully wrote ${names.length} plant names to JSON file!!`
    );
  fs.writeFile("data.json", json, "utf8", callback);
});
