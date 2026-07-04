import { useState } from "react";
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor, TouchSensor } from "@dnd-kit/core";
import "./App.css";
import Board from "./components/Board";
import Card from "./components/Card";
import WinScreen from "./components/WinScreen";
import GameOver from "./components/GameOver";
import { generarNumero, hayLugarParaNumero, checkWin, puedeColocar } from "./game";

function App() {
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 }
        }),
        useSensor(TouchSensor, {
            activationConstraint: { delay: 150, tolerance: 8 }
        })
    );

    const [numero, setNumero] = useState(generarNumero());
    const [board, setBoard] = useState(Array(20).fill(null));
    const [dragging, setDragging] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [numeroSinLugar, setNumeroSinLugar] = useState(null);
    const [saliendo, setSaliendo] = useState(false);
    const [colocado, setColocado] = useState(false);

    //Poner ambos en true para testear pantalla de victoria
    const [win, setWin] = useState(true);
    const [mostrarBotonOtra, setMostrarBotonOtra] = useState(true);

    function handleDragStart() {
        setDragging(true);
        setColocado(false);
    }

    function handleDragEnd(event) {
        setDragging(false);
        if (!event.over || gameOver || win) return;
        const posicion = event.over.id - 1;
        if (!puedeColocar(board, posicion, numero)) return;
        setColocado(true);
        const nuevoTablero = [...board];
        nuevoTablero[posicion] = numero;
        setBoard(nuevoTablero);
        if (checkWin(nuevoTablero)) {
            setWin(true);
            setTimeout(() => setMostrarBotonOtra(true), 300);
            return;
        }
        const siguiente = generarNumero();
        const hayLugar = hayLugarParaNumero(nuevoTablero, siguiente);
        setSaliendo(true);
        setTimeout(() => {
            if (!hayLugar) {
                setNumeroSinLugar(siguiente);
                setGameOver(true);
                setTimeout(() => setMostrarBotonOtra(true), 300);
                return;
            }
            setNumero(siguiente);
        }, 50);
        setTimeout(() => {
            setSaliendo(false);
            setColocado(false);
        }, 80);
    }

    function retry() {
        setNumero(generarNumero());
        setBoard(Array(20).fill(null));
        setDragging(false);
        setGameOver(false);
        setWin(false);
        setSaliendo(false);
        setColocado(false);
        setNumeroSinLugar(null);
        setMostrarBotonOtra(false);
    }

    return (
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="app">
                <h1>ASCEND</h1>
                <p className="subtitle">
                    Completá la grilla en orden ascendente.
                    <br />
                    No hay espacio para errores.
                </p>

                <div className="cardSlot">
                    {!dragging && !saliendo && !gameOver && !win && (
                        <Card key={numero} numero={numero} />
                    )}
                    {mostrarBotonOtra && (
                        <button className="retryBtn retryBtnSlot" onClick={retry}>
                            ¿Otra?
                        </button>
                    )}
                </div>
                <Board board={board} />
                <DragOverlay dropAnimation={null}>
                    {dragging && <Card numero={numero} dragging={true} />}
                </DragOverlay>
                {win && <WinScreen board={board} onRetry={retry} />}
                {gameOver && <GameOver numero={numeroSinLugar} onRetry={retry} />}
            </div>
        </DndContext>
    );
}

export default App;