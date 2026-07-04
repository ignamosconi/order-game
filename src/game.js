//  game.js  –  Lógica completa de Order Game
export const CANT_NUMS = 20;

/**
 * Genera un número aleatorio entre 1 y 999.
 * (igual que en Python: nunca devuelve 0)
 */
export function generarNumero() {
    let n = Math.floor(Math.random() * 1000);
    return n === 0 ? 1 : n;
}

/**
 * Verifica si `numero` puede colocarse en `posicion` (índice 0-based)
 * dentro del tablero actual sin romper el orden ascendente.
 *
 * Reglas (igual que Python):
 *  - Todos los valores NO-null ANTERIORES a posicion deben ser <= numero
 *  - Todos los valores NO-null POSTERIORES a posicion deben ser >= numero
 */
export function puedeColocar(board, posicion, numero) {
    // La celda tiene que estar vacía
    if (board[posicion] !== null) return false;

    // Anteriores: todos tienen que ser menores o iguales
    for (let i = 0; i < posicion; i++) {
        if (board[i] !== null && board[i] > numero) return false;
    }

    // Posteriores: todos tienen que ser mayores o iguales
    for (let i = posicion + 1; i < CANT_NUMS; i++) {
        if (board[i] !== null && board[i] < numero) return false;
    }

    return true;
}

/**
 * Devuelve true si existe AL MENOS UNA celda vacía donde
 * `numero` puede colocarse respetando el orden.
 * (equivale al chequeo de "juegoTerminado" del Python)
 */
export function hayLugarParaNumero(board, numero) {
    for (let posicion = 0; posicion < CANT_NUMS; posicion++) {
        if (board[posicion] !== null) continue; // celda ocupada, la saltamos

        let encaja = true;

        // Todos los ANTERIORES no-null tienen que ser <= numero
        for (let i = 0; i < posicion; i++) {
            if (board[i] !== null && board[i] > numero) {
                encaja = false;
                break;
            }
        }

        // Todos los POSTERIORES no-null tienen que ser >= numero
        if (encaja) {
            for (let i = posicion + 1; i < CANT_NUMS; i++) {
                if (board[i] !== null && board[i] < numero) {
                    encaja = false;
                    break;
                }
            }
        }

        if (encaja) return true; // encontramos al menos un lugar válido
    }

    return false; // no hay ningún lugar → el jugador pierde
}

/**
 * Devuelve true si el tablero está completamente lleno
 * (todas las 20 celdas tienen un valor no-null).
 * Equivale al chequeo de "contador == cantNums" del Python.
 */
export function checkWin(board) {
    return board.every(celda => celda !== null);
}

/**
 * Devuelve la lista de índices (0-based) donde `numero`
 * puede colocarse válidamente. Útil para dar feedback visual
 * al usuario mientras arrastra la carta.
 */
export function celdasValidas(board, numero) {
    const validas = [];
    for (let i = 0; i < CANT_NUMS; i++) {
        if (puedeColocar(board, i, numero)) validas.push(i);
    }
    return validas;
}

export function generarNumeroValido(board) {
    let n;
    do {
        n = generarNumero();
    } while (!hayLugarParaNumero(board, n));
    return n;
}