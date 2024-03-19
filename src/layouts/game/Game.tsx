import Hand from "../../components/hand/Hand";

function Game() {
    return (
        <>
            <div className="w-full h-5/6 bg-gradient-to-t from-blue-600 to-black overflow-hidden">
                <div className="w-full flex justify-center absolute bottom-0">
                    <Hand />
                </div>
                
            </div>
        </>
    )
}

export default Game;