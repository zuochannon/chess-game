import { DragonSuits, NumberedSuits, WindSuits } from "../data/enums/TileSuits";
import { Models } from "../data/models/Tile";
import { createNumberTiles, getName } from "./scripts/createTiles";

export const 
    PIN : Models.TileTypes.Numerical[] = [],
    MAN : Models.TileTypes.Numerical[] = [],
    SOU : Models.TileTypes.Numerical[] = [],
    DRAGON = {...DragonSuits},
    WIND = {...WindSuits};

createNumberTiles(NumberedSuits.PIN, PIN);
createNumberTiles(NumberedSuits.SOU, SOU);
createNumberTiles(NumberedSuits.MAN, MAN);

for (const t in DRAGON) {
    const tileName = `${t}`;
    DRAGON[t] = {
        suit: t,
        name: tileName,
        displayName: getName(tileName, 3)
    }
}

for (const t in WIND) {
    const tileName = `${t}`
    WIND[t] = {
        suit: t,
        name: tileName,
        displayName: getName(tileName, 2)
    }
}