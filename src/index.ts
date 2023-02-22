import { Canvas, Image } from "canvas";
import * as fs from "fs";

interface Vec2 {
	x: number;
	y: number;
}

const VEC2_ZERO = <Vec2>{ x: 0, y: 0 };

/**
 * Fills a region of a user-created <canvas> with the <pattern>. Does NOT crop the <pattern> at the end.
 * @param pattern Path or Buffer of the pattern
 * @param canvas User-created canvas
 * @param start Starting coordinates of the region
 * @param dimension Width and height of the region
 * @param offset Gap (both x and y, in pixels) between 2 patterns
 * @param shiftX Horizontal shift when filling patterns on next line
 * @returns {Promise<Canvas>}
 */
export function fillCanvasRegion(pattern: string | Buffer, canvas: Canvas, start: Vec2, dimension: Vec2, offset = VEC2_ZERO, shiftX = 0): Promise<Canvas> {
	return new Promise((res, rej) => {
		if (!dimension.x || !dimension.y) return res(canvas);

		if (dimension.x < 0) {
			start.x += dimension.x;
			dimension.x *= -1;
		}
		if (dimension.y < 0) {
			start.y += dimension.y;
			dimension.y *= -1;
		}

		const image = new Image();
	
		image.onload = () => {
			var x = start.x, y = start.y, row = 0;
			const ctx = canvas.getContext("2d");
			while (y <= start.y + dimension.y) {
				ctx.drawImage(image, x, y);
				x += image.width + offset.x;
				if (x > start.x + dimension.x) {
					x = start.x + shiftX * (++row);
					while (x > start.x) x -= image.width + offset.x;
					y += image.height + offset.y;
				}
			}
			res(canvas);
		}

		image.onerror = rej;
	
		if (typeof pattern === "string" && !fs.existsSync(pattern))
			rej(new Error("No such file"));
		image.src = pattern;
	});
}

/**
 * Creates a canvas of size <dimension> and fills it with the <pattern>
 * @param pattern Path or Buffer of the pattern
 * @param dimension Width and height of the region
 * @param offset Gap (both x and y, in pixels) between 2 patterns
 * @param shiftX Horizontal shift when filling patterns on next line
 * @returns {Promise<Canvas>}
 */
export function fillNewCanvas(pattern: string | Buffer, dimension: Vec2, offset = VEC2_ZERO, shiftX = 0): Promise<Canvas> {
	if (dimension.x <= 0 || dimension.y <= 0) throw new Error("Invalid width/height");

	return fillCanvasRegion(pattern, new Canvas(dimension.x, dimension.y, "image"), VEC2_ZERO, dimension, offset, shiftX);
}

/**
 * Fills a user created <canvas> with the <pattern>
 * @param pattern Path or Buffer of the pattern
 * @param canvas User-created canvas
 * @param offset Gap (both x and y, in pixels) between 2 patterns
 * @param shiftX Horizontal shift when filling patterns on next line
 * @returns {Promise<Canvas>}
 */
export function fillCanvas(pattern: string | Buffer, canvas: Canvas, offset = VEC2_ZERO, shiftX = 0): Promise<Canvas> {
	return fillCanvasRegion(pattern, canvas, VEC2_ZERO, { x: canvas.width, y: canvas.height }, offset, shiftX);
}