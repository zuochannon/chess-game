import clsx from "clsx";
import "../../layouts/components/ChessSquare.css";

interface Props {
  image?: string;
  number: number;
  lastMove: boolean;
  possibleMove: boolean;
}

export default function ChessSquare({
  image,
  number,
  lastMove,
  possibleMove,
}: Props) {
  // Get className to set division HTML element style
  const className: string = [
    "square",
    number % 2 === 0 ? "dark-tile" : "light-tile",
    lastMove ? "square-highlight" : "", // Apply square-highlight class when highlight prop is true
    image ? "chess-piece-square" : "", // Apply chess-piece-square class when there's an image
  ].join(" ");

  return (
    <div className={clsx(className, "flex flex-col justify-center items-center")}>
      {image && (
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="chess-piece"
        ></div>
      )}
      {possibleMove && <div className="h-1/2 w-1/2 bg-yellow-200 rounded-full bg-opacity-90"></div>}
    </div>
  );
}
