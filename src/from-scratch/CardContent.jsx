import React from "react";

const CardContent = ({ color }) => (
    <div className="card-outer">
        <div className="card-inner">
            <div
                style={{
                    backgroundColor: `#${color}`,
                    borderRadius: 1,
                    height: 45,
                    width: 80,
                    opacity: 0.4,
                }}
                draggable="false"
            ></div>
        </div>
    </div>
);
{
    /* <img src={url} width="80" height="45" draggable="false" /> */
}

export default CardContent;
