// src/layouts/game/Game.tsx

import React, { useState, useEffect } from "react";
import { ColorTeam } from "../../data/enums/ChessEnums";
import ChessRulesController from "../../components/chessboard/ChessRulesController";
import "../../layouts/pages/Play.css";

// src/layouts/game/Game.tsx

interface Props {
    offset: number;
    boardOrientation: ColorTeam;
    initialMoves: any[];  // Ensure this is included if it's expected as a prop
}

const Game: React.FC<Props> = ({ offset, boardOrientation, initialMoves }) => {
    return (
        <div id="play" className="content-center" style={{ marginTop: `${offset}px` }}>
            {/* Assuming ChessRulesController handles rendering the board based on moves */}
            <ChessRulesController offset={offset} boardOrientation={boardOrientation} moves={initialMoves} />
        </div>
    );
}

export default Game;

