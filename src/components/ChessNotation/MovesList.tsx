import { useChessContext }from '../../context/ChessContext'
import '../../layouts/components/MovesList.css'

const MovesList = () => {

    const { chessState : {movesList} } = useChessContext();

    return <div className='moves-list'>
        {movesList.map((move,i) => 
            <div key={i} data-number={Math.floor(i/2)+1}>{move}</div>
        )}
    </div>
}

export default MovesList