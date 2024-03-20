import { DragonSuits, NumberedSuits, WindSuits } from "../enums/TileSuits"

declare namespace Models{
    declare namespace TileTypes {
        declare type Numerical = {
            suit: NumberedSuits
            number: number
            name: string
            displayName: string
        }

        declare type Dragon = {
            suit: DragonSuits
            name: string
            displayName: string
        }

        declare type Wind = {
            suit: WindSuits
            name: string
            displayName: string
        }

        declare type Honor = Dragon | Wind;
    }
    declare type Tile = TileTypes.Numerical | TileTypes.Honor | TileTypes.Wind;
}