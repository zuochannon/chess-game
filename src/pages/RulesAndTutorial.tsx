import { NavigationBar } from '../components/NavigationBar';
import '../layouts/RulesAndTutorial.css';
export function RulesAndTutorial() {

    return (
        <main className = 'h-screen bg-[#1e3a8a]'>
            <NavigationBar />
            <h1 className = 'p-2 bg-black text-center w-screen text-3xl font-bold'>
                CHESS RULES AND TUTORIAL
            </h1>
            <div className ='p-2 w-auto bg-gradient-to-t from-blue-700 via-85% via-blue-950 to-100% to-black relative'>
                <div style={{margin: "10px auto", width: "50vw", padding: "10px"}}>
                    <h2 className='sectionTitle'>Objective:</h2>
                    <p>Chess is a two-player strategy board game played on an 8x8 grid known as a chessboard. </p>
                    
                    <h2 className='sectionTitle'>Setup:</h2>
                    <p>Each player starts with 16 pieces: one king, one queen, two rooks, two knights, two bishops, and eight pawns. The pieces are arranged on the first two rows (ranks) closest to each player.</p>
                    
                    <h2 className='sectionTitle'>Piece Movement:</h2>
                    <ul>
                        <li><strong>King:</strong> Moves one square in any direction.</li>
                        <li><strong>Queen:</strong> Moves any number of squares in any direction (horizontally, vertically, or diagonally).</li>
                        <li><strong>Rook:</strong> Moves any number of squares horizontally or vertically.</li>
                        <li><strong>Bishop:</strong> Moves any number of squares diagonally.</li>
                        <li><strong>Knight:</strong> Moves in an L-shape, two squares in one direction and then one square perpendicular.</li>
                        <li><strong>Pawn:</strong> Moves forward one square but captures diagonally.</li>
                    </ul>
                    
                    <h2 className='sectionTitle'>Special Moves:</h2>
                    <p>Castling and En passant are special moves in chess.</p>
                    
                    <h2 className='sectionTitle'>Check and Checkmate:</h2>
                    <p> When a king is under threat of capture (in check), but has no legal move to escape, it is in checkmate, and the game ends.</p>
                    
                    <h2 className='sectionTitle'>Stalemate:</h2>
                    <p> If a player's turn to move comes, but the player's king is not in check, and there are no legal moves to make, the game ends in a draw due to stalemate.</p>
                </div>
            </div>
        </main>
    )
}
