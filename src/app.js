import React from "react";
import Timer from "./components/timer";

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            seconds: 5,
        };
    }

    tick() {
        this.setState((state) => {
            if (state.seconds > 0) {
                return {
                    seconds: state.seconds - 1,
                };
            } return state
        });
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                <Timer seconds={this.state.seconds}  />
            <Timer />
            </div>
        );
    }
}

export default App;
