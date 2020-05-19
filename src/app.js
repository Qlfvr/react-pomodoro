import React from "react";
import Timer from "./components/timer";
import Button from "./components/button";
import TaskInput from "./components/task-input";

const defaultTimer = 5; //default timer time in seconds
const defaultBreak = 2; //default break time in seconds

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            settingUp: true,
            seconds: 5,
            maxValue: defaultTimer, // temps maximum du compteur
            play: false,
            wasBreak: false,
        };

        this.timerIncrement = this.timerIncrement.bind(this);
        this.timerDecrement = this.timerDecrement.bind(this);
        this.timerReset = this.timerReset.bind(this);
        this.timerSwitch = this.timerSwitch.bind(this);
        this.timerBreak = this.timerBreak.bind(this);
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
            clearInterval(this.interval);

            if (this.state.wasBreak === false) {
                this.timerBreak();
            } else {
                this.timerReset();
            }
        }
    }

    timerSwitch() {
        // currently off :

        if (this.state.play === false) {
            this.interval = setInterval(() => this.tick(), 1000);

            this.setState(() => ({
                play: true,
                settingUp: false,
            }));
        } else {
            clearInterval(this.interval);

            this.setState(() => ({
                play: false,
            }));
        }
    }

    timerIncrement() {
        this.setState(prevState => ({
            seconds: prevState.seconds + 300,
            maxValue: prevState.seconds + 300,
        }));
    }
    timerDecrement() {
        if (this.state.seconds >= 300) {
            this.setState(prevState => ({
                seconds: prevState.seconds - 300,
                maxValue: prevState.seconds - 300,
            }));
        }
    }
    timerReset() {
        clearInterval(this.interval);
        this.setState(() => ({
            seconds: defaultTimer,
            maxValue: defaultTimer,
            play: false,
            settingUp: true,
            wasBreak: false,
        }));
    }

    timerBreak() {
        this.setState(() => ({
            seconds: defaultBreak,
            maxValue: defaultBreak,
            play: false,
            wasBreak: true,
        }));
    }

    render() {
        if (this.state.wasBreak === true) {
            document.body.classList.add("bg-break");
        } else {
            document.body.classList.remove("bg-break");
        }

        let reset = "";

        if (this.state.wasBreak === false) {
            reset = "Reset";
        } else {
            reset = "Skip";
        }

        return (
            <div className={"main"}>
                {this.state.wasBreak === false ? (
                    <TaskInput />
                ) : (
                    <h1>{"Take five Dave !"}</h1>
                )}

                <Timer
                    seconds={this.state.seconds}
                    maxValue={this.state.maxValue}
                />

                {/* set up buttons*/}

                {/* eslint-disable no-extra-parens */}
                {this.state.settingUp ? (
                    <Button handleClick={this.timerIncrement} label={"+5"} />
                ) : (
                    ""
                )}

                <Button
                    handleClick={this.timerSwitch}
                    label={this.state.play === true ? " Pause" : "Go"}
                />
                <Button handleClick={this.timerReset} label={reset} />

                {this.state.settingUp ? (
                    <Button handleClick={this.timerDecrement} label={" -5 "} />
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default App;
