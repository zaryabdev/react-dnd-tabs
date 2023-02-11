import React, { useEffect, useRef } from "react";
import CardContent from './CardContent';
const log = data => console.log(data);

export default function Card(props) {
    const ref = useRef(null);

    const onClick = e => {
        props.onSelectionChange(props.index, e.ctrlKey, e.shiftKey);
    };

    return (
        <div className={`card-div-${props.id}`} style={{ position: "relative" }}>
            <div className="card-wrapper">
                <div className="card" onClick={onClick}>
                    <CardContent url={props.url} />
                </div>
            </div>
        </div>
    );
}