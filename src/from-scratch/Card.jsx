import React, { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import CardContent from "./CardContent";

export default function Card(props) {
    // useEffect(() => {
    //     console.log(props);
    // }, [props]);
    const ref = useRef(null);
    const { color } = props;

    return (
        <div key={`card-div-${props.id}`} style={{ position: "relative" }}>
            <div className="card-wrapper">
                <div ref={ref} className="card">
                    <CardContent color={color} />
                </div>
            </div>
        </div>
    );
}
