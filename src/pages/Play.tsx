import Game from '../layouts/game/Game'
import "../layouts/pages/Play.css"

export function Play() {

    return (
        <main className = 'h-screen bg-black'>
            <div id="play" className ='p-2 w-auto bg-gradient-to-t from-blue-700 via-85% via-blue-950 to-100% to-black relative'>
                <Game />
            </div>
        </main>
    )
}
