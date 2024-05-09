import { ColorTeam } from "@/data/enums/ChessEnums";
import ChessRulesController from "../../components/chessboard/ChessRulesController";
import "../pages/Play.css"
import { Board } from "@/data/models/Board";

interface Props {
    offset: number;
    boardOrientation: ColorTeam;
    board: Board;
}

function Game({ offset, boardOrientation, board } : Props) {
    return (
        <div id = "play" className="content-center">
            <ChessRulesController offset= {offset} boardOrientation = {boardOrientation} chessboard = {board} />
        </div>
    )
}

export default Game;