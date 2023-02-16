import { Canvas, Image } from "canvas";
import * as fs from "fs";

export default function filler(pattern: string | Buffer, width: number, height: number, offsetX = 0, offsetY = 0, shiftX = 0): Promise<Buffer> {
	return new Promise((res, rej) => {
		if (width <= 0 || height <= 0) rej(new Error("Invalid width/height"));
	
		const image = new Image();
	
		image.onload = () => {
			var x = 0, y = 0, row = 0;
			const canvas = new Canvas(width, height, "image");
			const ctx = canvas.getContext("2d");
			while (y <= canvas.height) {
				ctx.drawImage(image, x, y);
				x += image.width + offsetX;
				if (x > canvas.width) {
					x = 0 + shiftX * (++row);
					while (x > 0) x -= image.width + offsetX;
					y += image.height + offsetY;
				}
			}
			res(canvas.toBuffer());
		}

		image.onerror = rej;
	
		if (typeof pattern === "string" && !fs.existsSync(pattern))
			rej(new Error("No such file"));
		image.src = pattern;
	});
}