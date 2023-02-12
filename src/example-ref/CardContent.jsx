import React from "react";

const CardContent = ({ url, color }) => {
    return (
        <div className="card-outer">
            <div className="card-inner">
                <img src={url} width="200" height="45" />
            </div>
        </div>
    );
};
// <div
//     style={{ backgroundColor: `#${color}` }}
//     width="200"
//     height="45"
// >
//     <div style={{ width: "100%" }}>#{color}</div>
// </div>

export default CardContent;
