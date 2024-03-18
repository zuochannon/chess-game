function Tile({ tileNum } : { tileNum : number }) {
    return (
        <span className="bg-gray-200 w-4 m-4 p-5 rounded-md flex flex-col items-center justify-center">
            {tileNum}
        </span>
    )
}

export default Tile;