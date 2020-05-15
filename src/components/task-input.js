import React from "react";

class TaskInput extends React.Component {
    constructor() {
        super();

        this.state = {
            value: "",
        };
    }

    render() {
        return (
            <div>
                <input
                    className={"task-input"}
                    placeholder={"What do you focus on ?"}
                    value={this.state.value}
                    onChange={event => {
                        this.setState({value: event.target.value});
                    }}
                />

                <p>{this.state.value}</p>
            </div>
        );
    }
}

export default TaskInput;
