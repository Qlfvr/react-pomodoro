import React from "react";

class Timer extends React.Component {
    constructor() {
        super();
        this.state = {timer: "00:00"};
    }

    render() {
        return <div>{this.state.timer}</div>;
    }
}

export default Timer;
