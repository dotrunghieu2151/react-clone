
import React, { useState } from './react.js';

const container = document.querySelector('#root');
const Test = () => {
  return (
    <ul>
      <li>foo</li>
      <li>boo</li>
      <li>bar</li>
    </ul>
  )
}
const App = () => {
  const [state, setState] = useState(1);
  const [text, setText] = useState("hello");
  console.log("RERENDER", state, text);
  const updateBatch = () => {
    const val = state * Math.random()
    setState(val);
    setText(val);
  }
  return (
    <div>
      <h1>{text}</h1>
      <h1>STATE HERE: {state}</h1>
      <button onClick={() => setState(state + 1)}>{state}</button>
      <input value={text} onInput={(e) => setText(e.target.value)} />
      <button onClick={updateBatch}>UPDATE BATCH</button>
      <Test />
    </div>
  )
}

React.createRoot(container).render(<App />);