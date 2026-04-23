import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  const fetchMessage = async () => {
    const res = await fetch("http://localhost:3000/api");
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>FundCircle App</h1>
      <button onClick={fetchMessage}>Call Backend</button>
      <p>{message}</p>
    </div>
  );
}

export default App;