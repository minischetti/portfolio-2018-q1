import * as React from "react";
import * as Help from "../help.json";
import * as Experience from "../experience.json";

interface AppProps {
    value: string;
    command: string;
    text: [string, Array<string>];
    x: Array<string>;
    lines: Array<string>;
}

export class App extends React.Component<AppProps, any> {
    constructor(props: any) {
        super(props);
        this.state = { focus: true, value: "", lines: [] };
    }
    updateValue = (value: string) => {
        this.setState({ value: value });
    }
    updateLines = (text: Array<string>) => {
        this.setState({ lines: [...this.state.lines, ...text] });
    }
    handleSubmit = (event: any) => {
        event.preventDefault();
        event.target.reset();
        this.checkCommand();
    }
    clearLines = () => {
        this.setState({ lines: [] });
    }
    checkCommand() {
        const command = this.state.value.toLowerCase();
        let lines = [command];
        switch (command) {
            case "help":
                Help.commands.forEach((x: Array<string>) => {
                    lines = [...lines, ...`${x.name}: ${x.description}`];
                });
                this.updateLines(lines);
                break;
            case "experience":
                Experience.jobs.forEach((x) => {
                    lines = [...lines, ...`${x.name} | ${x.role} | ${x.duration}\n${x.description}\n\n`];
                });
                this.updateLines(lines);
                break;
            case "clear":
                this.clearLines();
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
                <Input updateValue={this.updateValue} handleSubmit={this.handleSubmit} focus={this.state.focus}/>
            </div>
        )
    }
}

interface TerminalProps {
    lines: Array<string>;
    line: Array<string>;
}

export class Terminal extends React.Component<TerminalProps, any> {
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
                <div>Hello, welcome to my portfolio! To begin, type commands like experience, or skills. If you need help, simply type help.</div>
                {lines}
            </div>
        )
    }
}

export class Input extends React.Component<App, any> {
    handleChange = (event: any) => {
        this.props.updateValue(event.target.value);
    }
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <span>portfolio dominicminischetti$&nbsp;</span>
                <input id="input" type="text" placeholder="type your command..." onChange={this.handleChange} autoFocus autoComplete="off" />
            </form>
        )
    }
}