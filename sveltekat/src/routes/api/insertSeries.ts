import * as pb from "../../lib/PocketBase";
import * as fs from "fs";

export async function get(req: Request) {

    const data = fs.readFileSync("../../html-parser/data.json", "utf8");
    const json = JSON.parse(data);

    json.forEach(async (object: pb.Series) => {
        await pb.insertSeries(object);
    });

    return {
        body: {
            message: "Data inserted successfully"
        }
    };
}
