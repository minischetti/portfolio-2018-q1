import * as React from "react";
import * as Help from "../help.json";
import * as Experience from "../experience.json";

export class App extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = { value: "", lines: [] };
    }
    updateValue = (value: String) => {
        this.setState({ value: value });
    }
    updateLines = (text: String) => {
        this.setState({ lines: [...this.state.lines, ...text] });
    }
    handleSubmit = (event: any) => {
        event.preventDefault();
        event.target.reset();
        this.checkCommand();
    }
    checkCommand() {
        const command = this.state.value.toLowerCase();
        let lines = [command];
        switch (command) {
            case "help":
                Help.commands.forEach((x) => {
                    lines = [...lines, ...`${x.name}: ${x.description}`];
                });
                this.updateLines(lines);
                break;
            case "experience":
                Experience.jobs.forEach((x) => {
                    lines = [...lines, ...`${x.name} | ${x.role} | ${x.duration}`];
                    lines = [...lines, ...x.description];
                });
                this.updateLines(lines);
                break;
            default:
                const array = [{ "type": "error", "text": `${command}: command not found` }];
                this.updateLines(array);
        }
    }
    render() {
        return (
            <div className="terminal-container">
                <Terminal lines={this.state.lines} />
                <Input updateValue={this.updateValue} handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export class Terminal extends React.Component {
    render() {
        const lines = this.props.lines.map((line) => {
            if (line.type) {
                return <div className={line.type}>{line.text}</div>
            } else {
                return <div>{line}</div>
            }
        });
        return (
            <div className="terminal">
                {lines}
            </div>
        )
    }
}

export class Input extends React.Component {
    handleChange = (event: any) => {
        this.props.updateValue(event.target.value);
    }
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <span>portfolio dominicminischetti$&nbsp;</span>
                <input type="text" onChange={this.handleChange} autoFocus />
            </form>
        )
    }
}