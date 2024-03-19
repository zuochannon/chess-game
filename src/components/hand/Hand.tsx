import Tile from "./Tile";

function Hand({ hand } : { hand : number[] }){
    return (
        <>
            <div className="overflow-auto w-9/12 bg-slate-600 p-2 bg-opacity-5 shadow-2xl flex flex-row">
                {
                    hand.map( (n) => <Tile tileNum ={n} />)
                }
            </div>
        </>
    )
}

export default Hand;