//Cell.jsx
import colors from "../colors";
import {useDroppable} from "@dnd-kit/core";

function Cell({posicion,valor}){

    const { 
        setNodeRef
    }=useDroppable({
        id:posicion
    });

    let color="#d9d9d9";

    if(valor!=null){

        color=colors[posicion%colors.length];

    }

    return(

        <div ref={setNodeRef} className="cell" style={{ background:color }} >
            {
                valor!=null &&
                <div className="cellNumber">
                    {valor}
                </div>
            }

            <div className="cellPosition">
                {posicion}
            </div>

        </div>

    );

}

export default Cell;