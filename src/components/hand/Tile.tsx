function Tile({ tileNum } : { tileNum : number }) {
    return (
        <span className="bg-gray-200 w-4 h-16 m-2 p-5 rounded-md flex flex-col items-center justify-center cursor-pointer"
                onClick={ () => {
                    alert(`played ${tileNum}`);
                }}>
            {tileNum}
        </span>
    )
}

export default Tile;