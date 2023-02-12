import React, { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import CardContent from './CardContent';
import ItemTypes from './ItemTypes';
const log = data => console.log(data);

export default function Card(props) {
    const ref = useRef(null);

    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: {
            // log(monitor);
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
                log(item);
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
            <div className={"card-wrapper " + styleClasses.join(" ")}>
                <div ref={(node) => drag(drop(node))} className="card" onClick={onClick} style={{ opacity }}>
                    <CardContent url={props.url} />
                </div>
            </div>
        </div>
    );
}