import "../../layouts/components/ChessSquare.css"

interface Props {
    image?: string
    number: number
}

export default function ChessSquare( { image, number } : Props) {

    if (number % 2 === 0) {
        return (
            <div className="square dark-tile">
                {image && <div style = {{backgroundImage: `url(${image})`}} className = "chess-piece" />}
            </div>
        );
    } else {
        return (
            <div className="square light-tile">
                {image && <div style = {{backgroundImage: `url(${image})`}} className = "chess-piece" />}
            </div>
        );
    }
}