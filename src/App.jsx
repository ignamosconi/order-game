import { useState } from "react";
import Nav from "./components/Nav";
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor, TouchSensor } from "@dnd-kit/core";
import "./App.css";
import colors from "./colors";
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

    //ESTADOS
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

    //Colores
    const [colorIndex, setColorIndex] = useState(0);
    const [colorActual, setColorActual] = useState(colors[0]);
    const [coloresTablero, setColoresTablero] = useState(Array(20).fill(null));


    //FUNCIONES
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

        const nuevosColores = [...coloresTablero];
        nuevosColores[posicion] = colorActual;
        setColoresTablero(nuevosColores);

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
            const nuevoIndex = (colorIndex + 1) % colors.length;
            setColorIndex(nuevoIndex);
            setColorActual(colors[nuevoIndex]);
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
        setColoresTablero(Array(20).fill(null));
        setColorIndex(0);
        setColorActual(colors[0]);
    }

    return (
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="app">
                <Nav />
                <h1>ASCEND</h1>
                <p className="subtitle">
                    Completá la grilla en orden ascendente.
                </p>

                <div className="cardSlot">
                    {!dragging && !saliendo && !gameOver && !win && (
                        <Card key={numero} numero={numero} color={colorActual} />
                    )}
                    {mostrarBotonOtra && (
                        <button className="retryBtn retryBtnSlot" onClick={retry}>
                            ¿Otra?
                        </button>
                    )}
                </div>
                <Board board={board} colores={coloresTablero} />
                <DragOverlay dropAnimation={null}>
                    {dragging && <Card numero={numero} dragging={true} color={colorActual} />}
                </DragOverlay>
                {win && <WinScreen board={board} onRetry={retry} />}
                {gameOver && <GameOver numero={numeroSinLugar} onRetry={retry} />}
            </div>
        </DndContext>
    );
}

export default App;