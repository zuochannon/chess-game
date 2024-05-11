import { ColorTeam } from "@/data/enums/ChessEnums";
import ChessRulesController from "../../components/chessboard/ChessRulesController";
import "../pages/Play.css";

interface Props {
    offset: number;
    boardOrientation: ColorTeam;
    onlineHandler: any;
}

function Game({ offset, boardOrientation, onlineHandler } : Props) {
    return (
        <div id = "play" className="content-center">
            <ChessRulesController offset= {offset} boardOrientation = {boardOrientation} onlineHandler ={onlineHandler}/>
        </div>
    )
}

export default Game;