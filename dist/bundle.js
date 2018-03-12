/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(2);
var App_1 = __webpack_require__(3);
ReactDOM.render(React.createElement(App_1.App, null), document.getElementById("app"));


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Help = __webpack_require__(4);
var Experience = __webpack_require__(5);
var Skills = __webpack_require__(6);
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.changeName = function (state) {
            _this.setState({ changeName: state });
        };
        _this.updateValue = function (value) {
            _this.setState({ value: value });
        };
        _this.updateLines = function (text) {
            _this.setState({ lines: _this.state.lines.concat(text) });
        };
        _this.setName = function () {
            _this.setState({ visitorName: _this.state.value }, function () {
                _this.updateLines("Welcome, " + _this.state.value + "! To begin, type a command such as \"experience\", or \"skills\". If you need help, simply type \"help\".");
            });
        };
        _this.clearName = function () {
            _this.setState({ visitorName: "" });
        };
        _this.updateName = function () {
            _this.setState({ visitorName: _this.state.value }, function () {
                _this.updateLines("Okay, I'll call you " + _this.state.visitorName + " from now on.");
            });
        };
        _this.handleSubmit = function (event) {
            event.preventDefault();
            event.target.reset();
            if (!_this.state.visitorName && !_this.state.changeName) {
                _this.setName();
            }
            else if (!_this.state.visitorName && _this.state.changeName) {
                _this.updateName();
                _this.changeName(false);
            }
            else {
                _this.checkCommand();
            }
        };
        _this.clearLines = function () {
            _this.setState({ lines: [] });
        };
        _this.state = { visitorName: "", changeName: false, focus: true, value: "", lines: [] };
        return _this;
    }
    App.prototype.checkCommand = function () {
        var command = this.state.value.toLowerCase();
        var lines = [command];
        switch (command) {
            case "help":
                Help.commands.forEach(function (x) {
                    lines = lines.concat(x.name + ": " + x.description);
                });
                break;
            case "experience":
                Experience.jobs.forEach(function (job) {
                    lines = lines.concat(job.name + " | " + job.role + " | " + job.duration + "\n" + job.description + "\n\n");
                });
                break;
            case "skills":
                Skills.skills.forEach(function (skill) {
                    lines = lines.concat(skill);
                });
            case "name":
                this.clearName();
                this.changeName(true);
                lines = ["What would you like me to call you?"];
                break;
            case "clear":
                this.clearLines();
                break;
            default:
                lines = [{ "type": "error", "text": command + ": sorry " + this.state.visitorName + ", that command could not be found" }];
        }
        this.updateLines(lines);
    };
    App.prototype.render = function () {
        return (React.createElement("div", { className: "terminal-container" },
            React.createElement(Terminal, { lines: this.state.lines }),
            React.createElement(Input, { updateValue: this.updateValue, handleSubmit: this.handleSubmit, focus: this.state.focus })));
    };
    return App;
}(React.Component));
exports.App = App;
var Terminal = /** @class */ (function (_super) {
    __extends(Terminal, _super);
    function Terminal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Terminal.prototype.render = function () {
        var lines = this.props.lines.map(function (line) {
            if (line.type) {
                return React.createElement("div", { className: line.type }, line.text);
            }
            else {
                return React.createElement("div", null, line);
            }
        });
        return (React.createElement("div", { className: "terminal" },
            React.createElement("div", null, "Hello! Welcome to the portfolio of Dominic Minischetti, a Front-end Engineer located in California. Please type your first name to begin."),
            lines));
    };
    return Terminal;
}(React.Component));
exports.Terminal = Terminal;
var Input = /** @class */ (function (_super) {
    __extends(Input, _super);
    function Input() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleChange = function (event) {
            _this.props.updateValue(event.target.value);
        };
        return _this;
    }
    Input.prototype.render = function () {
        return (React.createElement("form", { onSubmit: this.props.handleSubmit },
            React.createElement("span", null, "portfolio dominicminischetti$\u00A0"),
            React.createElement("input", { id: "input", type: "text", placeholder: "type your command...", onChange: this.handleChange, autoFocus: true, autoComplete: "off" })));
    };
    return Input;
}(React.Component));
exports.Input = Input;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {"description":"You can do the following:","commands":[{"name":"experience","description":"view current and past jobs"},{"name":"skills","description":"view a list of skills"},{"name":"resume","description":"view my resume"},{"name":"social","description":"view available social media profiles"},{"name":"email","description":"write me an email"},{"name":"clear","description":"clear all previous text"},{"name":"name","description":"change your name"}]}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = {"description":"Experience:","jobs":[{"name":"Williams-Sonoma, Inc.","role":"Front-end Engineer","duration":"April 2017 - Present","description":"Acts as a front-end engineer on an agile-driven team that creates and supports an expansive, multi-brand e-commerce platform. Collaborates with back-end and design teams to develop new initiatives utilizing core web technologies, Java and unit tests in SVN and Git workflows."},{"name":"Bisk Education","role":"Interactive Developer","duration":"April 2015 - March 2016","description":"Responsible for the design and development of internal and external marketing initiatives for nation-wide universities, including mobile and desktop websites and experiences. Worked extensively with other designers, developers, copywriters, stakeholders and the like to deliver impactful products."}]}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = {"skills":["HTML5","Freemarker (HTML Templating)","CSS3","SASS, Stylus (CSS Pre-processing)","JavaScript (+ ES6)","React","Webpack","Java","Automation Testing","Adobe Photoshop","Sketch"]}

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map