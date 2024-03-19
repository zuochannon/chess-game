let num : number;

function tileClick(){
    alert(`played ${num}`);
}

function Tile({ tileNum } : { tileNum : number }) {
    num = tileNum;
    return (
        <span className="bg-gray-200 w-4 m-4 p-5 rounded-md flex flex-col items-center justify-center cursor-pointer"
                onClick={tileClick}>
            {tileNum}
        </span>
    )
}

export default Tile;