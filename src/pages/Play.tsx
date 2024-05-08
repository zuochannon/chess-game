import { NavigationBarHeight } from '@/data/constants/NavItems'
import Game from '../layouts/game/Game'
import "../layouts/pages/Play.css"
import { ColorTeam } from '@/data/enums/ChessEnums'
import { useState } from 'react';

export function Play() {
    const [boardOrientation, setBoardOrientation] = useState(ColorTeam.WHITE);

    function changeOrientation() {
        setBoardOrientation((prevOrientation: ColorTeam) => 
        prevOrientation !== ColorTeam.WHITE ? ColorTeam.BLACK : ColorTeam.WHITE
        );
    }

    return (
        <main className='h-screen bg-gradient-to-t from-blue-700 via-85% via-blue-950 to-100% to-black relative flex flex-col items-center justify-center'>
            <div className="hidden flex-row content-center">
                <button onClick={changeOrientation} className="p-2 rounded-sm bg-slate-500 text-white mr-2">Change Orientation</button>
                {/* PLACEHOLDER */}
            </div>
            <div id="play" className='p-2 w-auto'>
                <Game offset={NavigationBarHeight} boardOrientation={boardOrientation} />
            </div>
        </main>

    )
}
