import { NavigationBar } from '../components/NavigationBar'
import Game from '../layouts/game/Game'

export function Play() {

    return (
        <main className = 'h-screen bg-black'>
            <NavigationBar />
            <h1 className = 'bg-[#0f0f0f] text-center w-full text-3xl font-bold'>
                PLAY
            </h1>
            <Game />
        </main>
    )
}
