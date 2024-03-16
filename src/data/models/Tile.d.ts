import { HonorSuits, TileSuits } from "../enums/TileSuits"

declare namespace Models{
    declare namespace Tiles{
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
}