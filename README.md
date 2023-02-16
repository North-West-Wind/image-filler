# Image Filler
Fills an empty canvas with a pattern.

## Usage
Install this package by
```
npm i image-filler
```

Import the package in your script by
```js
import filler from "image-filler"
```

The `filler` function is as follows
```ts
function filler(pattern: string | Buffer, width: number, height: number, offsetX?: number, offsetY?: number, shiftX?: number): Promise<Buffer>
```
- `pattern`: A path to the pattern or `Buffer` of the pattern.
- `width`: Width of the to-be-filled empty canvas.
- `height`: Height of the to-be-filled empty canvas.
- `offsetX`: The horizontal gap between each pattern.
- `offsetY`: The vertical gap between patterns.
- `shiftX`: The amount of pixels to move to the right when filling the next row.

## Testing
1. Clone this repo
2. Run `npm i`
3. Run `npm run build`
4. Run `npm test`. This will execute `test/test.ts`.

## License
GNU GPL v3