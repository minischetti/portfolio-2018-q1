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
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { value: "", lines: [] };
        _this.updateValue = _this.updateValue.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.updateLines = _this.updateLines.bind(_this);
        _this.checkCommand = _this.checkCommand.bind(_this);
        return _this;
    }
    App.prototype.updateValue = function (value) {
        this.setState({ value: value });
    };
    App.prototype.updateLines = function (text) {
        this.setState({ lines: this.state.lines.concat(text) });
    };
    App.prototype.handleSubmit = function (event) {
        event.preventDefault();
        this.updateLines(this.state.value);
        this.checkCommand();
    };
    App.prototype.checkCommand = function () {
        var command = this.state.value;
        var lines = [command];
        switch (command) {
            case "help":
                lines = lines.concat([Help.description]);
                Help.commands.forEach(function (x) {
                    lines = lines.concat(x.name + ": " + x.description);
                });
                this.updateLines(lines);
                break;
            default:
                this.updateLines(command + ": command not found");
        }
    };
    App.prototype.render = function () {
        return (React.createElement("div", { className: "terminal-container" },
            React.createElement(Terminal, { lines: this.state.lines }),
            React.createElement(Input, { updateValue: this.updateValue, handleSubmit: this.handleSubmit })));
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
            return React.createElement("div", null, line);
        });
        return (React.createElement("div", { className: "terminal" }, lines));
    };
    return Terminal;
}(React.Component));
exports.Terminal = Terminal;
var Input = /** @class */ (function (_super) {
    __extends(Input, _super);
    function Input(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }
    Input.prototype.handleChange = function (event) {
        this.props.updateValue(event.target.value);
    };
    Input.prototype.handleSubmit = function (event) {
        event.preventDefault();
    };
    Input.prototype.render = function () {
        return (React.createElement("form", { onSubmit: this.props.handleSubmit },
            React.createElement("input", { type: "text", onChange: this.handleChange }),
            React.createElement("input", { type: "submit", value: "Submit" })));
    };
    return Input;
}(React.Component));
exports.Input = Input;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {"description":"You can do the following:","commands":[{"name":"jobs","description":"view current and past jobs"},{"name":"social","description":"view available social media profiles"},{"name":"email","description":"write me an email"},{"name":"resume","description":"view my resume"}]}

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map