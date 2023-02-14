import { Canvas, Image } from "canvas";
import * as fs from "fs";

var width = 0, height = 0, offsetX = 0, offsetY = 0, shiftX = 0;
for (const arg of process.argv) {
	if (/o\d+x\d+/.test(arg)) [offsetX, offsetY] = arg.slice(1).split("x").map(x => parseInt(x));
	else if (/\d+x\d+/.test(arg)) [width, height] = arg.split("x").map(x => parseInt(x));
	else if (/s\d+/.test(arg)) shiftX = parseInt(arg.slice(1));
}

if (width <= 0 || height <= 0) throw new Error("Cannot parse width/height");

var filename = "";
for (const name of fs.readdirSync("."))
	if (/image/.test(name))
		filename = name;

if (!filename) throw new Error("No filler image found");

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

	fs.writeFileSync("generated.png", canvas.toBuffer());
}

image.src = filename;