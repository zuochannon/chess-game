import {createContext,useContext} from 'react';



interface ChessboardContext {
    // Props from user

}

export const ChessContext = createContext({} as ChessboardContext);

export const useChessboard = () => useContext(ChessContext);