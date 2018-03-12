import * as React from "react";
import * as Help from "../help.json";

export class App extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = { value: "", lines: []};
        this.updateValue = this.updateValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateLines = this.updateLines.bind(this);
        this.checkCommand = this.checkCommand.bind(this);
    }
    updateValue(value: String) {
        this.setState({value: value});
    }
    updateLines(text: String) {
        this.setState({ lines: [...this.state.lines, ...text] });
    }
    handleSubmit(event: any) {
        event.preventDefault();
        this.updateLines(this.state.value);
        this.checkCommand();
    }
    checkCommand() {
        const command = this.state.value;
        let lines = [command];
        switch(command) {
            case "help":
                lines = [...lines, Help.description];
                Help.commands.forEach((x) => {
                    lines = [...lines, ...`${x.name}: ${x.description}`];
                });
                this.updateLines(lines);
                break;
        }
    }
    render() {
        return (
            <div className="terminal-container">
                <Terminal lines={this.state.lines}/>
                <Input updateValue={this.updateValue} handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

export class Terminal extends React.Component {
    render() {
        const lines = this.props.lines.map((line) =>
            <div>{line}</div>
        );
        return (
            <div className="terminal">
                {lines}
            </div>
        )
    }
}

export class Input extends React.Component {
    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event: any) {
        this.props.updateValue(event.target.value);
    }
    handleSubmit(event: any) {
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <input type="text" onChange={this.handleChange} />
                <input type="submit" value="Submit" />
            </form>
        )
    }
}