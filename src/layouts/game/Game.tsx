import { ColorTeam } from "@/data/enums/ChessEnums";
import { Board } from "@/data/models/Board";
import ChessRulesController from "../../components/chessboard/ChessRulesController";
import "../pages/Play.css";

interface Props {
	offset: number;
	boardOrientation: ColorTeam;
	board: Board;
	onlineHandler: any;
}

function Game({ offset, boardOrientation, board, onlineHandler }: Props) {
	return (
		<div id="play" className="content-center">
			<ChessRulesController
				offset={offset}
				boardOrientation={boardOrientation}
				chessboard={board}
				onlineHandler={onlineHandler}
			/>
		</div>
	);
}

export default Game;
