import React from "react";
import Timer from "./components/timer";
import Button from "./components/button";

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            seconds: 1500,
        };

        this.timerIncrement = this.timerIncrement.bind(this);
        this.timerDecrement = this.timerDecrement.bind(this);
        this.timerReset = this.timerReset.bind(this);
    }

    tick() {
        this.setState(state => {
            if (state.seconds > 0) {
                return {
                    seconds: state.seconds - 1,
                };
            }
            return state;
        });
    }
    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    // button on clicks functions

    timerIncrement() {
        this.setState(prevState => ({seconds: prevState.seconds + 300}));
    }
    timerDecrement() {
        this.setState(prevState => ({seconds: prevState.seconds - 300}));
    }
    timerReset() {
        this.setState(() => ({seconds: 1500}));
    }

    render() {
        return (
            <div>
                <Timer seconds={this.state.seconds} />
                <Button handleClick={this.timerIncrement} label={"+"} />
                <Button handleClick={this.timerReset} label={" Reset "} />
                <Button handleClick={this.timerDecrement} label={" - "} />
            </div>
        );
    }
}

export default App;
