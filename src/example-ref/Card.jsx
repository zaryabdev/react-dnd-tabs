import React, { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import CardContent from './CardContent';
import ItemTypes from './ItemTypes';
const log = (data) => { return console.log(data); };

export default function Card(props) {
    const ref = useRef(null);

    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: () => {
            {
                const { id, order, url } = props;
                const draggedCard = { id, order, url };
                let cards;

                if (props.selectedCards.find(card => card.id === props.id)) {
                    cards = props.selectedCards;

                } else {
                    log("Clear called from drag item");
                    props.clearItemSelection();
                    cards = [draggedCard];
                }
                // log(monitor);

                return {
                    cards,
                    draggedCard
                };
            }
        },
        end: (item, monitor) => {
            // log(item);
            // log(monitor);
            props.rearrangeCards(item);

        },
        collect: (monitor) => {
            // log(monitor);
            // debugger;
            return {
                isDragging: monitor.isDragging(),
            };
        }

    }), []);

    const [{ hovered }, drop] = useDrop(() => {
        return {
            accept: ItemTypes.CARD,
            hover: (item, monitor) => {
                // log(item);
                const dragIndex = item.draggedCard.index;
                const hoverIndex = props.index;

                // Determine rectangle on screen
                const hoverBoundingRect = ref.current.getBoundingClientRect();
                const midX = hoverBoundingRect.left + (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

                // Determine mouse position
                const pointerOffset = monitor.getClientOffset();

                const newInsertIndex = pointerOffset.x < midX ? hoverIndex : hoverIndex + 1;


                props.setInsertIndex(dragIndex, hoverIndex, newInsertIndex);
            },
            collect: (monitor) => {
                return {
                    hovered: monitor.isOver()
                };
            }
        };
    }, []);

    const onClick = e => {
        props.onSelectionChange(props.index, e.ctrlKey, e.shiftKey);
    };

    // drag(ref);
    const opacity = isDragging ? .5 : 1;
    const styleClasses = [];

    if (props.isSelected) {
        styleClasses.push("card-wrapper-selected");
    }
    drag(drop(ref));
    return (
        <div className={`card-div-${props.id}`} style={{ position: "relative" }}>
            { /*
                <span className="text-white">
                {hovered ? "T" : "F"}
                </span>
            */}
            {
                props.inserLineOnLeft && hovered && (
                    <div className="insert-line-left"></div>
                )
            }
            <div className={"card-wrapper " + styleClasses.join(" ")}>
                <div ref={ref} className="card" onClick={onClick} style={{ opacity }}>
                    <CardContent url={props.url} color={props.color} />
                </div>
                { /*
                    <span className="text-white">
                        {
                            JSON.stringify(props)
                        }
                    </span>
                */}
            </div>
            {
                props.inserLineOnRight && hovered && (
                    <div className="insert-line-right"></div>
                )
            }

        </div>
    );
}