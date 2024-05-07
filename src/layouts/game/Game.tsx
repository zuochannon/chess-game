import { ColorTeam } from "@/data/enums/ChessEnums";
import ChessRulesController from "../../components/chessboard/ChessRulesController";
import "../pages/Play.css"

interface Props {
    offset: number;
    boardOrientation: ColorTeam;
}

function Game({ offset, boardOrientation } : Props) {
    return (
        <div id = "play" className="content-center">
            <ChessRulesController offset= {offset} boardOrientation = {boardOrientation} />
        </div>
    )
}

export default Game;