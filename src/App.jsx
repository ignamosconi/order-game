//App.jsx
import "./App.css";
import { useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";

import Board from "./components/Board";
import Card from "./components/Card";

import { generarNumero, hayLugarParaNumero, checkWin, puedeColocar } from "./game";



function App(){

    //ESTADOS
    const [numero,setNumero]=useState(generarNumero());
    const [board,setBoard]=useState( Array(20).fill(null) );
    const [dragging,setDragging]=useState(false);

    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState(false);

    //FUNCIONES
    function handleDragStart(){
        setDragging(true);
    }

    function handleDragEnd(event) {
        setDragging(false);
        if (!event.over || gameOver || win) return;

        const posicion = event.over.id - 1;

        // ← NUEVO: rechazar si la celda está ocupada O el número no encaja
        if (!puedeColocar(board, posicion, numero)) return;

        const nuevoTablero = [...board];
        nuevoTablero[posicion] = numero;
        setBoard(nuevoTablero);

        if (checkWin(nuevoTablero)) { setWin(true); return; }

        const siguiente = generarNumero();
        if (!hayLugarParaNumero(nuevoTablero, siguiente)) { setGameOver(true); return; }

        setNumero(siguiente);
    }

    return(

        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        
            <div className="app">
                <h1>ORDER GAME</h1>

                <p className="subtitle">
                    Arrastrá el número hacia una casilla.
                </p>

                <div className="cardSlot">
                    {numero != null && !dragging && <Card numero={numero} />}
                </div>

                <Board
                    board={board}
                />

                <DragOverlay>
                    {dragging &&
                        <Card numero={numero} overlay={true}/>
                    }
                </DragOverlay>

            </div>
        </DndContext>
    );

}

export default App;