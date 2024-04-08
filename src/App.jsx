import './App.css'
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Login from './Components/Login/Login'
import Dashboard from './Components/Dashboard'

function App() {

  return (

      <Router>
        <Routes>
          <Route path="/login" element={<Login/>} />
          {/* <PrivateRoute path="/dashboard" component={<Dashboard/>} /> */}
          <Route
          path="/dashboard"
          element={
            <Dashboard/>
          }
        />
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      </Router>
  )
}

export default App



