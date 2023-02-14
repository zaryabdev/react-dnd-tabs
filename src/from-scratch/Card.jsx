import React, { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import CardContent from "./CardContent";

export default function Card(props) {
    const ref = useRef(null);
    const { color } = props;

    // useEffect(() => {
    //     console.log(props);
    // }, [props]);

    const onClick = (e) => {
        props.onSelectionChange(props.index, e.crtlKey, e.shiftKey);
    };

    return (
        <div key={`card-div-${props.id}`} style={{ position: "relative" }}>
            <div className="card-wrapper">
                <div ref={ref} className="card" onClick={onClick}>
                    <CardContent color={color} />
                </div>
            </div>
        </div>
    );
}
