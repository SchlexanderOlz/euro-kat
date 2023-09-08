import {insertSeries, Series, SubSeries} from "../sveltekat/src/lib/PocketBase";
import * as fs from "fs";

const data = fs.readFileSync("./data.json", "utf8");
const json: Object[] = JSON.parse(data);

json.forEach(object => {
    const idLetters = object["figures"][0]["mpgNr"] // Convert this
    const year = object["year"]

    let subSeries: SubSeries[] 
    object["figures"]

    let new_object: Series = {
        idLetters,
        year,
        subSeries
    }
})