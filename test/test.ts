import { fillNewCanvas } from "../lib";
import * as fs from "fs";

(async () => {
	try {
		const buffer = await fillNewCanvas(__dirname + "/image.png", { x: 540, y: 540 }, { x: 2, y: 2 }, 3);
		fs.writeFileSync(__dirname + "/generated.png", buffer);
	} catch (err) {
		console.error(err);
	}
})();