import PocketBase from 'pocketbase';
import { Series } from '../sveltekat/src/lib/PocketBase.js'
import fs from "fs"

const pb = new PocketBase('https://ek.krenn.tech/');

async function add() {
	console.log(await pb.admins.authWithPassword('admin@admin.admin', 'Kennwort1!'));

    const series = pb.collection("Series")
    const data = fs.readFileSync("../html-parser/data.json", "utf8");
    const json = JSON.parse(data);

    console.log("sososo")
    await json.forEach(async(object: Series) => {
    });
}

add();
