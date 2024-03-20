import { HonorSuits, TileSuits } from "../enums/TileSuits"

declare namespace Models{
    declare namespace TileTypes{
        declare type Numerical = {
            suit: TileSuits
            number: number
            name: string
        }

        declare type Honor = {
            type: HonorSuits
            name: string
        }
    }

    declare type Tile = Numerical | Honor
}