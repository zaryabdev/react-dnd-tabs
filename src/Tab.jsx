import { memo } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes.jsx";
const style = {
    cursor: "move",
};
export const Tab = memo(function Card({ id, text, moveCard, findCard }) {
    const originalIndex = findCard(id).index;
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.CARD,
            item: { id, originalIndex },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
            end: (item, monitor) => {
                const { id: droppedId, originalIndex } = item;
                const didDrop = monitor.didDrop();
                if (!didDrop) {
                    moveCard(droppedId, originalIndex);
                }
            },
        }),
        [id, originalIndex, moveCard]
    );
    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.CARD,
            hover({ id: draggedId }) {
                if (draggedId !== id) {
                    const { index: overIndex } = findCard(id);
                    moveCard(draggedId, overIndex);
                }
            },
        }),
        [findCard, moveCard]
    );
    const opacity = isDragging ? 1 : 1;
    return (
        <div className="align-self-stretch mx-1 p-2 mx-1 bg-dark text-light" ref={(node) => drag(drop(node))} style={{ ...style, opacity }}>
            {text} <span className="ms-4 me-2">X</span>
        </div>
    );
});
