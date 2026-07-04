import Cell from "./Cell";

function Board({ board, colores }) {
    return (
        <div className="board">
            {board.map((valor, index) => (
                <Cell
                    key={index}
                    posicion={index + 1}
                    valor={valor}
                    color={colores[index]}
                />
            ))}
        </div>
    );
}

export default Board;