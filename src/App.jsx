import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState("Click to load data");

  const fetchMessage = async () => {
    setMessage("Loading...");
    fetch("/api/hello")
      .then(response => response.json())
      .then(data => setMessage(data.data))
      .catch(error => setMessage("Error loading message.\n" + error));
  };

  return (
    <>
      <div className="card">
        <button onClick={fetchMessage}>
          {message}
        </button>
      </div>
    </>
  )
}

export default App
