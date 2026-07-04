import { useDraggable } from "@dnd-kit/core";

function Card({ numero, dragging, color }) {
    const { attributes, listeners, setNodeRef } = useDraggable({ id: "card" });
    const className = dragging ? "card card-small" : "card";

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className={className}
            style={{ background: color }}
            tabIndex={0}
        >
            {numero}
        </div>
    );
}

export default Card;