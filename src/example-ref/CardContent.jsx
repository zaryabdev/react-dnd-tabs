import React from "react";

const CardContent = ({ url }) => {
    return <div className="card-outer">
        <div className="card-inner">
            <img src={url} width="80" height="45" />
        </div>
    </div>;
};

export default CardContent;