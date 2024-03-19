import { useState } from 'react'
import './App.css'
import SteamLoginIcon from './assets/login-steam.png'
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Login from './Components/Login/Login'
import PrivateRoute from './Components/PrivateRoute'
import Dashboard from './Components/Dashboard'

function App() {
  // const [message, setMessage] = useState("Click to load data");
  // const fetchMessage = async () => {
  //   setMessage("Loading...");
  //   fetch("/api/hello")
  //     .then(response => response.json())
  //     .then(data => setMessage(data.data))
  //     .catch(error => setMessage("Error loading message.\n" + error));
  // };

  return (
    // <>
    //   <div className="card">
    //     <Login/>
    //     <button onClick={fetchMessage}>
    //       {message}
    //     </button>
    //     <a
    //         className="App-link"
    //         href="http://localhost:8080/api/steamlogin"
    //         target="_self"
    //         rel="noopener noreferrer"
    //       >
    //         <img src={SteamLoginIcon} alt="Steam Login" />
    //       </a>
    //   </div>
    // </>

      <Router>
        <Routes>
          <Route path="/login" element={<Login/>} />
          {/* <PrivateRoute path="/dashboard" component={<Dashboard/>} /> */}
          <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        />
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      </Router>
  )
}

export default App



