import React from "react";
import { ColorTeam } from "@/data/enums/ChessEnums";
import ChessRulesController from "../../components/chessboard/ChessRulesController";
import "../pages/Play.css";

interface Props {
    offset: number;
    boardOrientation: ColorTeam;
    moves: any[]; // Define the type of your moves properly, 'any' is used for simplicity here
}

const Game: React.FC<Props> = ({ offset, boardOrientation, moves }) => {
    return (
        <div id="play" className="content-center">
            <ChessRulesController offset={offset} boardOrientation={boardOrientation} moves={moves} />
        </div>
    );
}

export default Game;
