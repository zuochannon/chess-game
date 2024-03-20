import { NumberedSuits } from "../../data/enums/TileSuits";
import { Models } from "../../data/models/Tile";

const numLimit : number = 9;

export function getName(s : string, endIndex : number) : string {
    return s.substring(0, endIndex);
}

export function createNumberTiles(tileSuit : NumberedSuits, category : Models.TileTypes.Numerical[]) {
    for (let i = 1; i <= numLimit; i++) {
        category.push({
            suit: tileSuit,
            number: i,
            name: `${i} ${tileSuit}`,
            displayName: getName(`${i}${tileSuit}`, 2)
        })
    }
}