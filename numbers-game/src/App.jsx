//App.jsx
import "./App.css";
import { useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";

import Board from "./components/Board";
import Card from "./components/Card";

import { generarNumero } from "./game";



function App(){

    //ESTADOS
    const [numero,setNumero]=useState(generarNumero());
    const [board,setBoard]=useState( Array(20).fill(null) );
    const [dragging,setDragging]=useState(false);

    //FUNCIONES
    function handleDragStart(){
        setDragging(true);
    }

    function handleDragEnd(event){
        setDragging(false);

        if(!event.over){ return }

        const posicion=event.over.id-1;
        if(board[posicion] != null){
            return;
        }
        
        const nuevoTablero = [...board];
        nuevoTablero[posicion] = numero;
        setBoard(nuevoTablero);

        setNumero(generarNumero());
    }

    return(

        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        
            <div className="app">
                <h1>ORDER GAME</h1>

                <p className="subtitle">
                    Arrastrá el número hacia una casilla.
                </p>

                {
                    numero != null && !dragging &&
                    <Card numero={numero} />
                }

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