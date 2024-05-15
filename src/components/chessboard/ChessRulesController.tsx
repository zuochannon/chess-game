import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { initialBoard } from "../../data/constants/ChessConstants";
import { ColorTeam, PieceType } from "../../data/enums/ChessEnums";
import { Board } from "../../data/models/Board";
import { ChessPiece, Pawn } from "../../data/models/ChessPiece";
import { Position } from "../../data/models/Position";
import { generateMoveNotation } from "../ChessNotation/ChessNotation";
import {
	bishopMove,
	kingMove,
	knightMove,
	pawnMove,
	queenMove,
	rookMove,
} from "../chessrules";
import Chessboard from "./ChessBoard";

interface Props {
	offset: number;
	boardOrientation: ColorTeam;
	chessboard: Board;
	onlineHandler: any;
	updateBoardState: (board: Board) => void;
	moveHistory: string[];
	updateMoveHistory: (move: string) => void;
	cleanOnRestart: () => void;
}

// Responsible for handling valid chess moves
export default function ChessRulesController({
	offset,
	boardOrientation,
	chessboard,
	onlineHandler,
	updateBoardState,
	moveHistory,
	updateMoveHistory,
	cleanOnRestart,
}: Props) {
	const [board, setBoard] = useState<Board>(chessboard);
	const [promotionPawn, setPromotionPawn] = useState<ChessPiece>();
	const [myTurn, setMyTurn] = useState(true);
	const [orientation, setOrientation] = useState<ColorTeam>(boardOrientation);
	const modalRef = useRef<HTMLDivElement>(null);
	const checkmateModalRef = useRef<HTMLDivElement>(null);
	const stalemateModalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		updateBoardState(board);
	}, [board]);

	// Boolean function to check if move was valid
	function playMove(playedPiece: ChessPiece, dest: Position): boolean {
		let isValidMove = false;

		// Check if the piece has possible moves to play
		if (playedPiece.possibleMoves === undefined) return isValidMove;

		// White and black switch turns
		if (playedPiece.color === ColorTeam.WHITE && board.totalTurns % 2 === 0)
			return isValidMove;
		if (playedPiece.color === ColorTeam.BLACK && board.totalTurns % 2 === 1)
			return isValidMove;

		// Check if desired position is a possible move for the piece being played
		const validMove = playedPiece.possibleMoves?.some((m) =>
			m.equalsTo(dest)
		);
		if (!validMove) return isValidMove;

		const enPassantMove = isEnPassantMove(
			playedPiece.position,
			dest,
			playedPiece.type,
			playedPiece.color
		);

		// Update chessboard to include all move changes
		setBoard((clonedChessboard) => {
			clonedChessboard = board.clone();
			clonedChessboard.totalTurns += 1; // Increase turn count

			// Plays the moves of the player
			isValidMove = clonedChessboard.playMove(
				enPassantMove,
				validMove,
				playedPiece,
				dest
			);

			// Winner prompt appears when winner is determined
			if (clonedChessboard.winningTeam !== undefined) {
				// Check if winning team is white or black
				if (
					clonedChessboard.winningTeam === ColorTeam.WHITE ||
					clonedChessboard.winningTeam === ColorTeam.BLACK
				) {
					checkmateModalRef.current?.classList.remove("hidden");
				}
				// Check for draw
				else if (clonedChessboard.winningTeam === ColorTeam.DRAW) {
					stalemateModalRef.current?.classList.remove("hidden");
				} else if (clonedChessboard.winningTeam === ColorTeam.ILLEGAL) {
					stalemateModalRef.current?.classList.remove("hidden");
				}
			}

			// Determine if the move results in check or checkmate
			const isCheck = clonedChessboard.getKingCheck();
			const isCheckmate = clonedChessboard.isCheckmate();
			const isStalemate = clonedChessboard.getStalemate();
			const startPosition = playedPiece.position.clone();

			// Attempt to find an existing piece at the destination to determine capture
			// Replace 'equals' with 'equalsTo' as per your error message
			const existingPiece = board.pieces.find((p) =>
				p.position.equalsTo(dest)
			);

			// Ensure 'isCapture' is always a boolean (false if 'existingPiece' is undefined or not an opposing piece)
			const isCapture = existingPiece
				? existingPiece.color !== playedPiece.color
				: false;

			// Append move to move history
			// Ensure all parameters are now correctly boolean
			const moveNotation = generateMoveNotation(
				playedPiece,
				board,
				startPosition,
				dest,
				isCapture,
				isCheck,
				isCheckmate
			);

			updateMoveHistory(moveNotation);

			if (isCheckmate) {
				updateMoveHistory(
					playedPiece.color === ColorTeam.WHITE ? "1-0" : "0-1"
				);
			} else if (isStalemate) {
				updateMoveHistory("1/2-1/2");
			}

			return clonedChessboard;
		});

		// Designates rows for pawns to reach for promotion
		let promotionRow = playedPiece.color === ColorTeam.WHITE ? 7 : 0;

		// Checks if pawn is ready for promotion
		if (dest.y === promotionRow && playedPiece.isPawn) {
			// Shows promotion prompt
			modalRef.current?.classList.remove("hidden");

			// Set promotion pawn
			setPromotionPawn(() => {
				const clonedPlayedPiece = playedPiece.clone();
				clonedPlayedPiece.position = dest.clone();
				return clonedPlayedPiece;
			});
		}

		return isValidMove;
	}

	// Check if move is an en passant move
	function isEnPassantMove(
		initialPosition: Position,
		newPosition: Position,
		type: PieceType,
		color: ColorTeam
	) {
		const pawnDir = color === ColorTeam.WHITE ? 1 : -1;

		// Check if piece is pawn
		if (type === PieceType.PAWN) {
			// Check if pawn piece being moved wants to move diagonally for en passant move
			if (
				(newPosition.x - initialPosition.x === -1 ||
					newPosition.x - initialPosition.x === 1) &&
				newPosition.y - initialPosition.y === pawnDir
			) {
				// Get pawn piece that is able to perform an en passant move
				const piece = board.pieces.find(
					(p) =>
						p.position.x === newPosition.x &&
						p.position.y === newPosition.y - pawnDir &&
						p.isPawn &&
						(p as Pawn).enPassant
				);

				// Check if it exists
				if (piece) return true;
			}
		}

		return false;
	}

	// Handles pawn promotion
	function promotePawn(pieceType: PieceType) {
		// Check if pawn promotion is possible
		if (promotionPawn === undefined) {
			return;
		}

		// Update board to include promoted pawn
		setBoard((clonedChessboard) => {
			clonedChessboard = board.clone();

			// During promotion, remove pawn piece and add promoted piece
			clonedChessboard.pieces = clonedChessboard.pieces.reduce(
				(results, piece) => {
					if (piece.hasSamePiecePositionAs(promotionPawn)) {
						// Add promoted pawn piece to the board
						results.push(
							new ChessPiece(
								piece.position.clone(),
								pieceType,
								piece.color,
								true
							)
						);
					} else {
						results.push(piece);
					}

					return results;
				},
				[] as ChessPiece[]
			);

			// Process all possible moves of chess pieces
			clonedChessboard.processAllPossibleMoves();

			return clonedChessboard;
		});

		// Hidden promotion prompt
		modalRef.current?.classList.add("hidden");
	}

	function promotionTeamType() {
		return promotionPawn?.color === ColorTeam.WHITE ? "w" : "b";
	}

	function restartGame() {
		checkmateModalRef.current?.classList.add("hidden");
		stalemateModalRef.current?.classList.add("hidden");
		setBoard(initialBoard.clone());
		cleanOnRestart();
		setOrientation((prevOrientation) =>
			prevOrientation === ColorTeam.WHITE
				? ColorTeam.BLACK
				: ColorTeam.WHITE
		);
	}

	// Forfeit the game
	function forfeitGame() {
		// Determine the winning team based on the current turn
		const winningTeam =
			board.totalTurns % 2 === 1 ? ColorTeam.BLACK : ColorTeam.WHITE;

		// Update the winning team and display the checkmate modal
		setBoard((prevBoard) => {
			const clonedBoard = prevBoard.clone();
			clonedBoard.winningTeam = winningTeam;
			return clonedBoard;
		});

		updateMoveHistory(winningTeam === ColorTeam.WHITE ? "1-0" : "0-1");

		// Show the checkmate modal
		checkmateModalRef.current?.classList.remove("hidden");
	}

	useEffect(() => {
		// If it someone else's turn, do not allow the other opponent to move
		if (onlineHandler) {
			console.log(board.totalTurns);
			console.log(boardOrientation);
			if (
				(board.totalTurns - 1) % 2 ==
				(boardOrientation == ColorTeam.WHITE ? 0 : 1)
			) {
				setMyTurn(true);
			} else {
				setMyTurn(false);
			}
			onlineHandler.playMove = playMove;
			onlineHandler.restartGame = restartGame;
		}
	}, [boardOrientation, board.totalTurns, onlineHandler]);

	// Return Promotion Prompt
	return (
		<>
			<div className="modal hidden" ref={modalRef}>
				<div className="modal-body">
					<img
						onClick={() => promotePawn(PieceType.ROOK)}
						src={`/${promotionTeamType()}R.png`}
					/>
					<img
						onClick={() => promotePawn(PieceType.BISHOP)}
						src={`/${promotionTeamType()}B.png`}
					/>
					<img
						onClick={() => promotePawn(PieceType.KNIGHT)}
						src={`/${promotionTeamType()}N.png`}
					/>
					<img
						onClick={() => promotePawn(PieceType.QUEEN)}
						src={`/${promotionTeamType()}Q.png`}
					/>
				</div>
			</div>
			<div className="modal hidden" ref={checkmateModalRef}>
				<div className="modal-body">
					<div className="gameover-body">
						<span className="text-center">
							{" "}
							{board.winningTeam === ColorTeam.WHITE
								? "White"
								: "Black"}{" "}
							wins!{" "}
						</span>
						<button
							onClick={
								onlineHandler
									? onlineHandler.restartGameLocal(
											restartGame
									  )
									: restartGame
							}
						>
							{" "}
							Play Again{" "}
						</button>
					</div>
				</div>
			</div>
			<div className="modal hidden" ref={stalemateModalRef}>
				<div className="modal-body">
					<div className="gameover-body">
						<span className="text-center">
							{" "}
							{board.winningTeam === ColorTeam.DRAW
								? "Draw!"
								: "Illegal"}{" "}
						</span>
						<button onClick={restartGame}> Play Again </button>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="flex flex-col items-center justify-between py-10">
					<div
						className="turn-count-box"
						style={{
							position: "relative",
							width: "100%",
						}}
					>
						<label
							className="text-white turn-label"
							style={{
								top: "10%",
								left: "50%",
								textAlign: "center",
							}}
						>
							Turn: {board.totalTurns}{" "}
							{board.totalTurns % 2 === 0
								? "Black's Turn"
								: "White's Turn"}
						</label>
					</div>

					<div className="inline-block">
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button variant="secondary">Forfeit</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>
										Forfeit?
									</AlertDialogTitle>
									<AlertDialogDescription>
										Are you absolutely sure you want to
										forfeit?
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>
										Cancel
									</AlertDialogCancel>
									<AlertDialogAction onClick={forfeitGame}>
										Continue
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				</div>
				<div className="chessboard-container">
					<Chessboard
						playMove={
							onlineHandler
								? onlineHandler.playMoveLocal(playMove, myTurn)
								: playMove
						}
						pieces={board.pieces}
						offset={offset}
						boardOrientation={boardOrientation}
					/>
				</div>
				<div className="move-history">
					<h3 className="text-center text-white p-2">PGN</h3>
					<div className="moves-container">
						{moveHistory.map((move, index) =>
							index % 2 === 0 ? (
								// Display both White and Black moves on the same line
								<span key={index} className="move-pair">
									<span>
										{Math.floor(index / 2) + 1}. {move}
									</span>
									{moveHistory[index + 1] && (
										<span className="black-move">
											{" "}
											{moveHistory[index + 1]}
										</span>
									)}
								</span>
							) : (
								// Add a line break after every black move
								<br key={index} />
							)
						)}
					</div>
				</div>
			</div>
		</>
	);
}
