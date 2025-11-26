import { useState, useEffect } from "react";

function App() {
  return (
    <div>
      <h1>Counter</h1>
      <Counter />        {/* your original counter */}
      <AutoCounter />   {/* new counter with useEffect + setInterval */}
      
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  function increaseCount() {
    setCount(count + 1);
  }

  function decreaseCount() {
    setCount(count - 1);
  }

  function Reset() {
    setCount(0);
  }

  return (
    <div>
      <h1><center>{count}</center></h1>
      <button onClick={increaseCount}>Increase</button>
      <button onClick={decreaseCount}>Decrease</button>
      <button onClick={Reset}>Reset</button>
    </div>
  );
}

/* --------------------------------
   AUTO COUNTER USING USEEFFECT
---------------------------------- */
function AutoCounter() {
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!start) return; // do nothing if not started

    const id = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(id); // cleanup
  }, [start]);

  return (
    <div style={{ marginTop: "40px" }}>
      <h1>Auto Counter</h1>
      <h2>{count}</h2>

      <button onClick={() => setStart(true)}>Start Auto</button>
      <button onClick={() => setStart(false)}>Stop Auto</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default App;
