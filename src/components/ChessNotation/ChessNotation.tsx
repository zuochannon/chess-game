import { ReactNode } from 'react';
import '../../layouts/components/ChessNotation.css';

interface ChessNotationProps {
    children: ReactNode;
}

const ChessNotation = ({children}:ChessNotationProps) => {

    return (
        <div className='chess-notation'>
            {children}
        </div>
    );
}

export default ChessNotation;