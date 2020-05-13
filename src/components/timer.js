import React from "react";

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
            <p className={"timer"}>
                {`${formatTime(time.hours)}:${formatTime(
                    time.minutes,
                )}:${formatTime(time.seconds)}`}
            </p>
        );
    }
}

export default Timer;
