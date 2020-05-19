import React from "react";
import Timer from "./components/timer";
import Button from "./components/button";
import TaskInput from "./components/task-input";

const defaultTimer = 1500; //session time in seconds
const defaultBreak = 300; //short  break time in seconds
const longBreak = 1800; // long break time in seconds

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            cpt: 0, //Count every complete work session
            settingUp: true,
            seconds: defaultTimer,
            maxValue: defaultTimer, // temps maximum du compteur
            play: false,
            wasBreak: false,
            topic: "",
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
                this.setState(prevState => ({
                    cpt: prevState.cpt + 1,
                }));

                // //Create a log of the working session
                // sessionStorage.setItem(this.state.cpt, this.state.topic);

                // launch a break

                this.timerBreak();
            } else {
                this.timerReset();
            }
        }
    }

    timerSwitch() {
        if (this.state.play === false) {
            // if statement = switch on
            // every time we start
            this.interval = setInterval(() => this.tick(), 1000);

            this.setState({
                play: true,
                settingUp: false,
            });
        } else {
            //else statement = switch off

            clearInterval(this.interval);

            this.setState({
                play: false,
            });
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
        clearInterval(this.interval); //Stop running tick()
        this.setState({
            seconds: defaultTimer,
            maxValue: defaultTimer,
            play: false,
            settingUp: true,
            wasBreak: false,
        });
    }

    timerBreak() {
        this.setState({
            play: false,
            wasBreak: true,
        });

        if (this.state.cpt % 5 === 0) {
            //set a longer break when number of work session (cpt) is a multiple of 5
            this.setState({
                seconds: longBreak,
                maxValue: longBreak,
            });
        } else {
            this.setState({
                seconds: defaultBreak,
                maxValue: defaultBreak,
            });
        }
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

        // const log = ()=>{for (var i = 0; i < sessionStorage.length; i++){
        //     sessionStorage.getItem(sessionStorage.key(i));
        // }}

        return (
            <div className={"main"}>
                {this.state.wasBreak === false ? (
                    <TaskInput
                        running={this.state.play}
                        onChange={event => {
                            this.setState({topic: event.target.value});
                        }}
                    />
                ) : (
                    <h1>{"Time to take a break !"}</h1>
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
