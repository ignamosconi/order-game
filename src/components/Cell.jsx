import { useDroppable } from "@dnd-kit/core";

function Cell({ posicion, valor, color }) {
    const { setNodeRef } = useDroppable({ id: posicion });
    const colorFondo = valor != null ? color : "#d9d9d9";

    return (
        <div ref={setNodeRef} className="cell">
            <div className="cellNumber" style={{ background: colorFondo }}>
                {valor != null ? valor : ""}
            </div>
            <div className="cellPosition">
                {posicion}
            </div>
        </div>
    );
}

export default Cell;