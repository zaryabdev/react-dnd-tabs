import React, { useEffect, useRef } from "react";
import CardContent from './CardContent';

export default function Card(props) {
    const ref = useRef(null);

    return (
        <div className={`card-div-${props.id}`}>
            <div className="card-wrapper">
                <div className="card">
                    <CardContent url={props.url} />
                </div>
            </div>
        </div>
    );
}