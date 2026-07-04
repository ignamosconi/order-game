//Card.jsx
import {useDraggable} from "@dnd-kit/core";

function Card({numero}){

    const {
        attributes,
        listeners,
        setNodeRef,
        transform
    } = useDraggable({
        id:"card"
    });

    const style={
        transform:transform?
        `translate3d(${transform.x}px,${transform.y}px,0)`
        :undefined
    };

    return(

        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="card" >
            {numero}
        </div>
    );

}

export default Card;