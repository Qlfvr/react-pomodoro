import React from "react";
import Timer from "./components/timer";
import Button from "./components/button";
import TaskInput from "./components/task-input";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            settingUp: true,
            seconds: 1500,
            maxValue: 1500, // temps maximum du compteur
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
    }
    // componentDidMount() {
    //     this.interval = setInterval(() => this.tick(), 1000);
    // }

    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }

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
        this.setState(() => ({
            seconds: 1500,
            maxValue: 1500,
            play: false,
            settingUp: true,
        }));
    }

    render() {
        console.log("un rendu a été fait");

        return (
            <div className={"main"}>
                <TaskInput />

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
                    label={this.state.play === true ? " Pause" : "Play"}
                />
                <Button handleClick={this.timerReset} label={" Reset "} />

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
