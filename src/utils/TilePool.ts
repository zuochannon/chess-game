import { DragonSuits, HonorSuits, NumberedSuits, WindSuits } from "../data/enums/TileSuits";
import { Models } from "../data/models/Tile";
import { createHonorTiles, createNumberTiles } from "./scripts/createTiles";

export const 
    PIN : Models.TileTypes.Numerical[] = [],
    MAN : Models.TileTypes.Numerical[] = [],
    SOU : Models.TileTypes.Numerical[] = [],
    DRAGON = {...DragonSuits},
    WIND = {...WindSuits};

createNumberTiles(NumberedSuits.PIN, PIN);
createNumberTiles(NumberedSuits.SOU, SOU);
createNumberTiles(NumberedSuits.MAN, MAN);

createHonorTiles(HonorSuits.DRAGON, DRAGON);
createHonorTiles(HonorSuits.WIND, WIND);