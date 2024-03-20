import { DragonSuits, WindSuits } from "../data/enums/TileSuits";
import { Models } from "../data/models/Tile";
import * as Pool from "../utils/TilePool";

export const PLAYER_HAND : Models.Tile[] = [
    Pool.PIN[1],
    Pool.PIN[2],
    Pool.PIN[3],
    Pool.PIN[4],
    Pool.PIN[5],
    Pool.PIN[7],
    Pool.MAN[3],
    Pool.MAN[5],
    Pool.SOU[5],
    Pool.DRAGON[DragonSuits.GREEN],
    Pool.DRAGON[DragonSuits.GREEN],
    Pool.DRAGON[DragonSuits.RED],
    Pool.DRAGON[DragonSuits.WHITE],
    Pool.WIND[WindSuits.EAST],
    Pool.WIND[WindSuits.SOUTH],
    Pool.WIND[WindSuits.WEST],
];
export const DISCARDED : Models.Tile[] = [
    Pool.PIN[2],
    Pool.MAN[4],
    Pool.SOU[1],
    Pool.MAN[6],
    Pool.PIN[3],
];