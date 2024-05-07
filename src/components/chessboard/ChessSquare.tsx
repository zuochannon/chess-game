import "../../layouts/components/ChessSquare.css"

interface Props {
    image?: string;
    number: number;
    highlight: boolean;
}

export default function ChessSquare({ image, number, highlight }: Props) {
    // Get className to set division HTML element style
    const className: string = [
        "square", 
        number % 2 === 0 ? "dark-tile" : "light-tile", 
        highlight ? "square-highlight" : "",  // Apply square-highlight class when highlight prop is true
        image ? "chess-piece-square" : ""  // Apply chess-piece-square class when there's an image
    ].join(' ');

    return (
        <div className={className}>
            {image && <div style={{ backgroundImage: `url(${image})` }} className="chess-piece"></div>}
        </div>
    );
}
