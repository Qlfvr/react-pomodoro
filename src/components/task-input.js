import React from "react";

function TaskInput(props) {
    return (
        <div>
            <input
                className={"task-input"}
                placeholder={"What do you focus on ?"}
                value={props.topic}
                onChange={props.onChange}
                disabled={props.running}
            />
        </div>
    );
}

export default TaskInput;
