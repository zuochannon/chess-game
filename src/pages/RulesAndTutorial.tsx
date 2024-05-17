import styles from "../layouts/pages/RulesAndTutorial.module.css";

export function RulesAndTutorial() {
	return (
		<main className={styles.main}>
			<h1
				className={`${styles.h1} p-2 bg-black text-center w-screen text-3xl font-bold`}
			>
				CHESS RULES AND TUTORIAL
			</h1>
			<div
				className={`${styles.content} p-2 w-auto bg-gradient-to-t from-blue-700 via-85% via-blue-950 to-100% to-black relative`}
			>
				<div
					style={{
						margin: "10px auto",
						width: "50vw",
						padding: "10px",
					}}
				>
					<p className={styles.p}>
						Chess is a two-player strategy board game played on an
						8x8 grid known as a chessboard.
					</p>
					<br />
					<h2 className={styles.h2}>Setup:</h2>
					<p className={styles.p}>
						Each player starts with 16 pieces: one king, one queen,
						two rooks, two knights, two bishops, and eight pawns.
						The pieces are arranged on the first two rows closest to
						each player.
					</p>
					<br />
					<h2 className={styles.h2}>Chessboard Notation:</h2>
					<p className={styles.p}>
						The chessboard is an 8x8 grid with alternating light and dark squares. 
						Each square is uniquely identified by a coordinate system:
					</p>
					<ul className={styles.ul}>
						<li className={styles.p}>
							Files (columns) are labeled a through h from left to right from White's perspective.
						</li>
						<li className={styles.p}>
							Ranks (rows) are numbered 1 through 8 from bottom to top from White's perspective.
						</li>	
					</ul>
					<br/>
					<h2 className={styles.h2}>Piece Movement:</h2>
					<ul className={styles.ul}>
						<li className={styles.p}>
							King: Moves one square in any direction.
						</li>
						<li className={styles.p}>
							Queen: Moves any number of squares in any direction
							(horizontally, vertically, or diagonally).
						</li>
						<li className={styles.p}>
							Rook: Moves any number of squares horizontally or
							vertically.
						</li>
						<li className={styles.p}>
							Bishop: Moves any number of squares diagonally.
						</li>
						<li className={styles.p}>
							Knight: Moves in an L-shape, two squares in one
							direction and then one square perpendicular.
						</li>
						<li className={styles.p}>
							Pawn: Moves forward one square but captures
							diagonally.
						</li>
					</ul>
					<br />
					<h2 className={styles.h2}>Special Moves:</h2>
					<ul className={styles.ul}>
						<li className={styles.p}>
							Castling: The king and a rook move simultaneously to
							improve safety and connect the rooks.
						</li>
						<li className={styles.p}>
							En Passant: A pawn captures an opponent's pawn
							immediately after it moves two squares forward from
							its starting position.
						</li>
					</ul>
					<br />
					<h2 className={styles.h2}>Check and Checkmate:</h2>
					<p className={styles.p}>
						When a king is under threat of capture (in check), but
						has no legal move to escape, it is in checkmate, and the
						game ends.
					</p>
					<br />
					<h2 className={styles.h2}>Stalemate:</h2>
					<p className={styles.p}>
						If a player's turn to move comes, but the player's king
						is not in check, and there are no legal moves to make,
						the game ends in a draw due to stalemate.
					</p>
				</div>
			</div>
		</main>
	);
}
