import React, { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import CardContent from "./CardContent";
import ItemTypes from "./ItemTypes";
const log = (data) => console.log(data);
export default function Card(props) {
    const ref = useRef(null);
    const { color } = props;
    // useEffect(() => {
    //     console.log(props);
    // }, [props]);

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: (monitor) => {
            const { id, order, color } = props;
            const draggedCard = { id, order, color };
            let cards;

            if (props.selectedCards.find((card) => card.id === props.id)) {
                cards = props.selectedCards;
            } else {
                // TODO: clear selection
                // props.clearItemSelection();
                cards = [draggedCard];
            }
            return {
                cards,
                draggedCard,
            };
        },
        end: (item, monitor) => {
            props.rearrangeCards(item);
            props.clearItemSelection();
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [{ hovered }, drop] = useDrop({
        accept: ItemTypes.CARD,
        hover: (item, monitor) => {
            const dragIndex = item.draggedCard.id;
            // TODO: find where draggedCard.index is used
            // const dragIndex = item.draggedCard.index;
            const hoverIndex = props.index;

            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            // Get horizontal middle
            const midX = Math.trunc(
                hoverBoundingRect.left +
                    (hoverBoundingRect.right - hoverBoundingRect.left) / 2
            );
            // Determine mouse position
            const pointerOffset = monitor.getClientOffset();
            const pointerOffsetX = pointerOffset.x;
            let newInsertIndex;

            if (pointerOffsetX < midX) {
                newInsertIndex = hoverIndex;
            }

            if (pointerOffsetX > midX) {
                newInsertIndex = hoverIndex + 1;
            }

            // log(midX);
            // log(pointerOffset.x);
            // log(newInsertIndex);

            props.setInsertIndex(dragIndex, hoverIndex, newInsertIndex);
        },
        collect: (monitor) => ({
            hovered: monitor.isOver(),
        }),
    });

    const onClick = (e) => {
        props.onSelectionChange(props.index, e.crtlKey, e.shiftKey);
    };

    const styleClasses = [];

    if (props.isSelected) {
        styleClasses.push("card-wrapper-selected");
    }

    drag(drop(ref));

    const opacity = isDragging ? 0.5 : 1;

    return (
        <div key={`card-div-${props.id}`} style={{ position: "relative" }}>
            {props.insertLineOnLeft && hovered && (
                <div className="insert-line-left"></div>
            )}
            <div className={"card-wrapper " + styleClasses.join(" ")}>
                <div
                    ref={ref}
                    className="card"
                    onClick={onClick}
                    style={{ opacity }}
                >
                    <CardContent color={color} />
                    <small className="sm"></small>
                </div>
            </div>
            {props.insertLineOnRight && hovered && (
                <div className="insert-line-right"></div>
            )}
        </div>
    );
}
