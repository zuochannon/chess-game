import React, { useRef } from 'react';

interface piece {

    name: string;
    pieceType: string;
}

export const ChessPiece (props: piece) => JSX.Element = ({}) => {
    return (
        <div
        style={{
            backgroundImage: `url("${src}.png")`,
        }}
            >
        </div>
    );
}