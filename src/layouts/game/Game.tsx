import ChessRulesController from "../../components/chessboard/ChessRulesController";
import "../pages/Play.css"

interface Props {
    offset: number;
}

function Game({ offset } : Props) {
    return (
        <div id = "play" className="content-center">
            <ChessRulesController offset= {offset}/>
        </div>
    )
}

export default Game;