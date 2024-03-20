import { Models } from "../../data/models/Tile";

function Tile({ tileNum } : { tileNum : Models.Tile }) {
    return (
        <>
        <div className="max-w-16 m-1 cursor-pointer">
            <img src={tileNum.imageURL} 
                onClick={ () => {
                    alert(`You played ${tileNum.name}`);
                }}
                alt={tileNum.displayName}/>
        </div>
        {/* <span className="bg-gray-200 w-4 h-16 m-2 p-5 rounded-md flex flex-col items-center justify-center cursor-pointer"
                onClick={ () => {
                    alert(`You played ${tileNum.name}`);
                }}>
            {tileNum.displayName}
        </span> */}
        </>
    )
}

export default Tile;