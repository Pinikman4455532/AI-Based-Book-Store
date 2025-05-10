import React, { useState } from 'react';
import '../CSS/Announce.css';

const Demo = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const reset = () => setCount(0);

  return (
    <div className="container">
      <h1 className="title">React Counter Demo</h1>
      <p className="counter">Count: {count}</p>
      <div className="button-group">
        <button className="button" onClick={increment}>Increment</button>
        <button className="reset-button" onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default Demo;