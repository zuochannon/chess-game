import "../../layouts/components/ChessSquare.css"

interface Props {
    image?: string
    number: number
}

export default function ChessSquare( { image, number } : Props) {

    if (number % 2 === 0) {
        return (
            <div className="square dark-tile">
                <img src={image} />
            </div>
        );
    } else {
        return (
            <div className="square light-tile">
                <img src={image} />
            </div>
        );
    }
}