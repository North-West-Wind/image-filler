# Image Filler
Fills a canvas with a pattern, using the [`canvas`](https://github.com/Automattic/node-canvas) package.

## Usage
Install this package by
```
npm i image-filler
```

Import the package in your script by
```js
import { fillCanvasRegion, fillNewCanvas, fillCanvas } from "image-filler"
```

The functions are defined as follows
```ts
function fillCanvasRegion(pattern: string | Buffer, canvas: Canvas, start: Vec2, dimension: Vec2, offset = VEC2_ZERO, shiftX = 0): Promise<Canvas>

function fillNewCanvas(pattern: string | Buffer, dimension: Vec2, offset = VEC2_ZERO, shiftX = 0): Promise<Canvas>

function fillCanvas(pattern: string | Buffer, canvas: Canvas, offset = VEC2_ZERO, shiftX = 0): Promise<Canvas>
```
All parameters sharing the same name have the same meaning.
- `pattern`: Path or Buffer of the pattern
- `canvas`: User-created canvas
- `start`: Starting coordinates of the region
- `dimension`: Width and height of the region
- `offset`: Gap (both x and y, in pixels) between 2 patterns
- `shiftX`: Horizontal shift when filling patterns on next line

`Vec2` is an interface that can be created by `{ x: number, y: number }`.  
All functions return the resulted canvas.

## Example/Testing
Check `test/test.ts` for example.

1. Clone this repo
2. Run `npm i`
3. Run `npm run build`
4. Run `npm test`. This will execute `test/test.ts`.

## License
GNU GPL v3