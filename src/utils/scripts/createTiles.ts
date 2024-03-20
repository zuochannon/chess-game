import { HonorSuits, NumberedSuits } from "../../data/enums/TileSuits";
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

export function createHonorTiles(honorSuit : HonorSuits, category : object) {
    let endIndex = 2;
    switch (honorSuit) {
        case HonorSuits.DRAGON:
            endIndex = 3;
            break;

        case HonorSuits.WIND:
            endIndex = 2;
            break;
    }

    for (const t in category) {
        const tileName = `${t}`
        category[t] = {
            suit: t,
            name: tileName,
            displayName: getName(tileName, endIndex)
        }
    }
}