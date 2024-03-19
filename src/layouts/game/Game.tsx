import DiscardPile from "../../components/discard/DiscardPile";
import Hand from "../../components/hand/Hand";
import { DISCARDED, PLAYER_HAND } from "../../context/GameState";


function Game() {
    return (
        <>
            <div className="w-full h-5/6 bg-gradient-to-t from-blue-400 via-95% via-blue-800 to-100%% to-black relative">
                <DiscardPile discards={DISCARDED} />
                <div className="w-full flex justify-center absolute bottom-5">
                    <Hand hand={PLAYER_HAND} />
                </div>
                
            </div>
        </>
    )
}

export default Game;