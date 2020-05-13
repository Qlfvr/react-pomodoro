import React from "react";

function Button(props) {
    return (
        <button type={"button"} onClick={props.handleClick}>
            {props.label}
        </button>
    );
}

export default Button;
