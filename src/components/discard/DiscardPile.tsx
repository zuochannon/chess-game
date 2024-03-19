import Tile from "../hand/Tile";

function DiscardPile({ discards } : { discards : number[] }) {
    return (
        <>
            <div className="w-full h-4/6 p-2 flex flex-row">
                {
                    discards.map( (n) => <Tile tileNum ={n} />)
                }
            </div>
        </>
    )
}

export default DiscardPile;