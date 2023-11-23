const fs = require("fs");
const csv = require("csv-parser");

const importCsvToMongo = async (Model, csvFilePath) => {
  try {
    console.log(
      `Importing data from ${csvFilePath} to ${Model.collection.name}`
    );

    const data = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (row) => {
        data.push(row);
      })
      .on("end", async () => {
        const batchSize = 100;

        for (let i = 0; i < data.length; i += batchSize) {
          const batch = data.slice(i, i + batchSize);
          await Model.insertMany(batch, { timeout: 60000 });
        }

        console.log("Data from imported successfully to");
      });
  } catch (error) {
    console.error("Error importing data", error);
  }
};

module.exports = importCsvToMongo;
