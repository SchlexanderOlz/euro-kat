const pb = require("pocketbase")
const fs = require("fs")

const data = fs.readFileSync("../../html-parser/data.json", "utf8");
const json = JSON.parse(data);
const connection = 

json.forEach(object => {
    pb.insertSeries(object);
});


async function insertSeries(series: object) {
	await connection.collections.create('series', series);
}