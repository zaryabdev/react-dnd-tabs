import React, { Fragment, memo } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes.jsx";
const style = {
    cursor: "move",
};
export const Tab = memo(function Card({ id, text, card, selectedCard, moveCard, removeCard, findCard, setSelectedCard, children }) {
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
        <Fragment>
            <div className="align-self-stretch mx-1 p-2 mx-1 bg-dark text-light" ref={(node) => drag(drop(node))} style={{ ...style, opacity }} onClick={() => setSelectedCard(card)}>
                {text} <span onClick={() => removeCard(originalIndex)} className="ms-4 me-2">X</span>
            </div>
            <div>
                {
                    selectedCard.id === card.id ? <div>
                        {children}
                    </div> : ""
                }
            </div>
        </Fragment>
    );
});
