import styles from '../layouts/pages/RulesAndTutorial.module.css';

export function RulesAndTutorial() {

    return (
        <main className={styles.main}>
            <h1 className={`${styles.h1} p-2 bg-black text-center w-screen text-3xl font-bold`}>
                CHESS RULES AND TUTORIAL
            </h1>
            <div className={`${styles.content} p-2 w-auto bg-gradient-to-t from-blue-700 via-85% via-blue-950 to-100% to-black relative`}>
                <div style={{ margin: "10px auto", width: "50vw", padding: "10px" }}>
                    <h2 className={styles.h2}>Objective:</h2>
                    <p className={styles.p}>Chess is a two-player strategy board game played on an 8x8 grid known as a chessboard. </p>

                    <h2 className={styles.h2}>Setup:</h2>
                    <p className={styles.p}>Each player starts with 16 pieces: one king, one queen, two rooks, two knights, two bishops, and eight pawns. The pieces are arranged on the first two rows (ranks) closest to each player.</p>

                    <h2 className={styles.h2}>Piece Movement:</h2>
                    <ul>
                        <li className={styles.li}><strong>King:</strong> Moves one square in any direction.</li>
                        <li className={styles.li}><strong>Queen:</strong> Moves any number of squares in any direction (horizontally, vertically, or diagonally).</li>
                        <li className={styles.li}><strong>Rook:</strong> Moves any number of squares horizontally or vertically.</li>
                        <li className={styles.li}><strong>Bishop:</strong> Moves any number of squares diagonally.</li>
                        <li className={styles.li}><strong>Knight:</strong> Moves in an L-shape, two squares in one direction and then one square perpendicular.</li>
                        <li className={styles.li}><strong>Pawn:</strong> Moves forward one square but captures diagonally.</li>
                    </ul>

                    <h2 className={styles.h2}>Special Moves:</h2>
                    <p className={styles.p}>Castling and En passant are special moves in chess.</p>

                    <h2 className={styles.h2}>Check and Checkmate:</h2>
                    <p className={styles.p}>When a king is under threat of capture (in check), but has no legal move to escape, it is in checkmate, and the game ends.</p>

                    <h2 className={styles.h2}>Stalemate:</h2>
                    <p className={styles.p}>If a player's turn to move comes, but the player's king is not in check, and there are no legal moves to make, the game ends in a draw due to stalemate.</p>
                </div>
            </div>
        </main>
    )
}
