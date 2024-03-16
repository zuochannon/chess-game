import Tile from "./Tile";

// function createHand(tile[]) {

// }

function Hand(){
    return (
        <>
            <div className="w-9/12 bg-slate-600 p-2">
                <Tile tileNum={5}></Tile>
            </div>
        </>
    )
}

export default Hand;