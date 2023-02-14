import React, { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import CardContent from "./CardContent";
import ItemTypes from "./ItemTypes";
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
            };
        },
        end: () => {
            props.clearItemSelection();
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [{ hovered }, drop] = useDrop({
        accept: ItemTypes.CARD,
        hover: (item, monitor) => {},
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

    return (
        <div key={`card-div-${props.id}`} style={{ position: "relative" }}>
            <div className={"card-wrapper " + styleClasses.join(" ")}>
                <div ref={ref} className="card" onClick={onClick}>
                    {isDragging ? "💔" : "❤"}
                    {hovered ? "💫" : "🕳"}
                    <CardContent color={color} />
                </div>
            </div>
        </div>
    );
}
