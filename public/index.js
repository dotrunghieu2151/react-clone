var _jsxFileName = "D:\\Program Files\\XAMPP\\htdocs\\react-clone\\src\\index.js";
import React, { useState } from './react.js';
const container = document.querySelector('#root');

const Test = () => {
  return /*#__PURE__*/React.createElement("ul", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7,
      columnNumber: 5
    }
  }, /*#__PURE__*/React.createElement("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 7
    }
  }, "foo"), /*#__PURE__*/React.createElement("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 7
    }
  }, "boo"), /*#__PURE__*/React.createElement("li", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 7
    }
  }, "bar"));
};

const App = () => {
  const [state, setState] = useState(1);
  const [text, setText] = useState("hello");
  console.log("RERENDER", state, text);

  const updateBatch = () => {
    const val = state * Math.random();
    setTimeout(() => {
      setState(val);
      setText("hi");
    }, 1000);
  };

  return /*#__PURE__*/React.createElement("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 5
    }
  }, /*#__PURE__*/React.createElement("h1", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 7
    }
  }, text), /*#__PURE__*/React.createElement("h1", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 7
    }
  }, "STATE HERE: ", state), /*#__PURE__*/React.createElement("button", {
    onClick: () => setState(state + 1),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 7
    }
  }, state), /*#__PURE__*/React.createElement("input", {
    value: text,
    onInput: e => setText(e.target.value),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 7
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: updateBatch,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 7
    }
  }, "UPDATE BATCH"), /*#__PURE__*/React.createElement(Test, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 7
    }
  }));
};

React.createRoot(container).render( /*#__PURE__*/React.createElement(App, {
  __self: this,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 37,
    columnNumber: 36
  }
}));