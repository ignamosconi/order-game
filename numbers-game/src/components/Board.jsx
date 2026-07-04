//Board.jsx
import Cell from "./Cell";

function Board({board}){

    return(

        <div className="board">
            {
                board.map((valor,index)=>(
                    <Cell key={index} posicion={index+1} valor={valor} />
                ))
            }
        </div>

        

    );

}

export default Board;