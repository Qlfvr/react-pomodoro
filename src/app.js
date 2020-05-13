import React from "react";
import Timer from "./components/timer";
import Button from "./components/button";

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            seconds: 1500,
            play: false,
        };

        this.timerIncrement = this.timerIncrement.bind(this);
        this.timerDecrement = this.timerDecrement.bind(this);
        this.timerReset = this.timerReset.bind(this);
        this.timerSwitch = this.timerSwitch.bind(this);
    }

    tick() {
        this.setState(state => {
            if (state.seconds > 0 && state.play === true) {
                return {
                    seconds: state.seconds - 1,
                };
            }
            return state;
        });
        if (this.state.seconds === 0) {
            this.timerReset();
        }
    }
    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    // button on clicks functions

    timerSwitch() {
        this.setState(prevState => ({
            play: !prevState.play,
        }));
    }

    timerIncrement() {
        this.setState(prevState => ({seconds: prevState.seconds + 300}));
    }
    timerDecrement() {
        if (this.state.seconds > 300) {
            this.setState(prevState => ({seconds: prevState.seconds - 300}));
        } else {
            this.setState(() => ({seconds: 0}));
        }
    }
    timerReset() {
        this.setState(() => ({
            seconds: 1500,
            play: false,
        }));
    }

    render() {
        return (
            <div className={"main"}>
                <Timer seconds={this.state.seconds} />
                <Button handleClick={this.timerIncrement} label={"+5"} />
                <Button
                    handleClick={this.timerSwitch}
                    label={this.state.play === true ? " Pause" : "Play"}
                />
                <Button handleClick={this.timerReset} label={" Reset "} />
                <Button handleClick={this.timerDecrement} label={" -5 "} />
            </div>
        );
    }
}

export default App;
