import React from "react";
// Import react-circular-progressbar module and styles
import {
    CircularProgressbarWithChildren,
    buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
class Timer extends React.Component {
    render() {
        function formatTime(number) {
            const formattedNumber = `0${number}`.slice(-2);
            return formattedNumber;
        }

        const time = {
            // days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor(this.props.seconds / (60 * 60)),
            minutes: Math.floor((this.props.seconds / 60) % 60),
            seconds: Math.floor(this.props.seconds % 60),
        };

        return (
            <CircularProgressbarWithChildren
                value={this.props.seconds}
                maxValue={this.props.maxValue}
                styles={buildStyles({
                    strokeLinecap: "butt",
                })}>
                {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}

                <p className={"timer"}>
                    {`${formatTime(time.hours)}:${formatTime(
                        time.minutes,
                    )}:${formatTime(time.seconds)}`}
                </p>
            </CircularProgressbarWithChildren>
        );
    }
}

export default Timer;
