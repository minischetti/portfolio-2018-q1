import * as React from "react";
import * as Help from "../help.json";
import * as Experience from "../experience.json";
import * as Skills from "../skills.json";

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
        this.state = { visitorName: "", focus: true, value: "", lines: [] };
    }
    componentDidMount() {
        if (!this.state.visitorName) {

        }
    }
    getVisitorName() {
        this
    }
    updateValue = (value: string) => {
        this.setState({ value: value });
    }
    updateLines = (text: Array<string>) => {
        this.setState({ lines: [...this.state.lines, ...text] });
    }
    setName = () => {
        this.setState({ visitorName: this.state.value }, () => {
            this.updateLines(`Welcome, ${this.state.value}! To begin, type a command such as "experience", or "skills". If you need help, simply type "help".`);
        });
    }
    clearName = () => {
        this.setState({ visitorName: "" });
    }
    updateName = (name) => {
        this.setState({ visitorName: name }, () => {
            this.updateLines(`Thanks ${name}, your name has been updated.`);
        });
    }
    handleSubmit = (event: any) => {
        event.preventDefault();
        event.target.reset();
        if (!this.state.visitorName) {
            this.setName();
        } else {
            this.checkCommand();
        }
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
                break;
            case "experience":
                Experience.jobs.forEach((job) => {
                    lines = [...lines, ...`${job.name} | ${job.role} | ${job.duration}\n${job.description}\n\n`];
                });
                break;
            case "skills":
                Skills.skills.forEach((skill: Array<string>) => {
                    lines = [...lines, ...skill];
                });
            case "name":
                this.clearName();
                lines = ["Please enter your name."];
                // this.updateName(command);
                break;
            case "clear":
                this.clearLines();
                break;
            default:
                lines = [{ "type": "error", "text": `${command}: sorry ${this.state.visitorName}, that command could not be found` }];
            }
        this.updateLines(lines);
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
                <div>Hello! Welcome to the portfolio of Dominic Minischetti, a Front-end Engineer located in California. Please type your name to begin.</div>
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