import filler from "../lib";
import * as fs from "fs";

(async () => {
	try {
		const buffer = await filler(__dirname + "/image.png", 540, 540, 2, 2, 3);
		fs.writeFileSync(__dirname + "/generated.png", buffer);
	} catch (err) {
		console.error(err);
	}
})();