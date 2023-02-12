import React, { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import CardContent from './CardContent';
import ItemTypes from './ItemTypes';
const log = data => console.log(data);

export default function Card(props) {
    const ref = useRef(null);

    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: () => {
            {
                const { id, order, url } = props;
                const draggedCard = { id, order, url };
                let cards;

                if (false) {
                    // add this later
                    // if (props.selectedCards.find((card) => card.id === props.id)) {
                    //     cards = props.selectedCards;
                    //   }
                } else {
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

    return (
        <div className={`card-div-${props.id}`} style={{ position: "relative" }}>
            {
                hovered ? "HOVERED" : ""
            }
            {
                props.inserLineOnLeft && hovered && (
                    <div className="inser-line-left"></div>
                )
            }
            <div className={"card-wrapper " + styleClasses.join(" ")}>
                <div ref={(node) => drag(drop(node))} className="card" onClick={onClick} style={{ opacity }}>
                    <CardContent url={props.url} color={props.color} />
                </div>
            </div>
            {
                props.inserLineOnRight && hovered && (
                    <div className="inser-line-right"></div>
                )
            }
        </div>
    );
}