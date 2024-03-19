import { NavigationBar } from '../components/NavigationBar';
import '../layouts/RulesAndTutorial.css';
export function RulesAndTutorial() {

    return (
        <main className = 'h-auto bg-[#1e3a8a]'>
            <NavigationBar />
            <h1 className = 'p-2 bg-[#1e3a8a] text-center w-screen text-3xl font-bold'>
                MAHJONG RULES AND TUTORIAL
            </h1>
            <div className ='p-2 w-auto bg-gradient-to-t from-blue-600 via-95% via-blue-900 to-100% to-[#1e3a8a] relative'>
                <div style={{margin: "10px auto", width: "50vw", padding: "10px"}}>
                    <h2 className='sectionTitle'>Objective:</h2>
                    <p>The objective of Mahjong is to build a complete hand by forming four sets (melds) and one pair (eyes) using the tiles.</p>
                    
                    <h2 className='sectionTitle'>Setup:</h2>
                    <p>The house starts with 14 tiles and the rest of the players begin with 13. The tiles are drawn from the wall of face-down tiles in the center.</p>
                    
                    <h2 className='sectionTitle'>Gameplay:</h2>
                    <ol>
                        <li>- Players take turns drawing a tile from the wall or claiming a tile discarded by another player.</li>
                        <li>- After drawing a tile, players can choose to form sets (melds) or discard a tile.</li>
                        <li>- To win, a player must form four sets (melds) and one pair (eyes).</li>
                        <li>- Once a player has a complete hand, they declare "Mahjong" and win the game.</li>
                    </ol>
                    
                    <h2 className='sectionTitle'>Types of Melds:</h2>
                    <p>There are two types of melds that can be formed:</p>
                    <ul>
                        <li><strong>Pung:</strong> Three identical tiles.</li>
                        <li><strong>Chow:</strong> Three consecutive tiles in the same suit.</li>
                        {/* <li><strong>Special Combinations:</strong> Certain combinations of tiles, such as three identical dragon tiles or three identical wind tiles.</li> */}
                    </ul>
                    
                    <h2 className='sectionTitle'>Winning:</h2>
                    <p>To win, a player's hand must consist of four melds (sets) and one pair (eyes). The winning tile must complete a valid winning combination.</p>
                    
                    <h2 className='sectionTitle'>Conclusion:</h2>
                    <p>Congratulations! You now understand the basic rules of Mahjong. Practice playing with friends or online to improve your skills!</p>
                </div>
            </div>
        </main>
    )
}
