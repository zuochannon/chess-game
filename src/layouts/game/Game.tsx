import ChessRulesController from "../../components/chessboard/ChessRulesController";
import "../pages/Play.css"
//import ChessNotation from "../../components/ChessNotation/ChessNotation";
//import MovesList from "../../components/ChessNotation/MovesList";

function Game() {
    return (
        <div id = "play" className="content-center">
            <ChessRulesController />
        </div>
    )
}

export default Game;