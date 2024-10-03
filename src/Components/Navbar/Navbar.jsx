import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';


import "./Navbar.css";

export const Navbar = () => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);

  const navigate = useNavigate(); // To navigate after logout

  const logout = async () => {
    fetch('/api/logout', { method: 'POST' })
      .then(response => {
        if (response.status !== 200) {
          throw new Error();
        }
      })
      .then(() => navigate('/'))
      .catch(() => console.log('Error logging out.'));
  };

  return (
    <nav>
      <Link to='/dashboard' className='Title'>Game Sphere</Link>
      
      
      <div className='search-bar'>
        <input type='text' placeholder='Search...' />
      </div>

      <ul className='navbar-items'>
       
      <li>
            <div className='menu-container'>
              <div
                className='menu-trigger'
                onClick={() => { setNotificationMenuOpen(!notificationMenuOpen); }}
              >
                {/* Notification icon */}
                <IoMdNotificationsOutline size={24} color="var(--primary-text-color)" />
              </div>
            </div> 
          </li>

        {/* Account Section */}
        <li>
          <div className='menu-container'>
            <div
              className='menu-trigger'
              
              onClick={() => { setAccountMenuOpen(!accountMenuOpen); }}
            >
               <FaUserCircle size={24} color="var(--primary-text-color)" />
            </div>
            <div className={`dropdown-menu ${accountMenuOpen ? 'active' : 'inactive'}`}>
              <ul>
                <DropdownItem text={"My Profile"} to="" />
                <DropdownItem text={"Settings"} to="/settings" />
                <DropdownItem text={"Logout"} onClick={logout} />
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

function DropdownItem(props) {
  return (
    <li className='dropdown-item'>
      {props.to ? (
        <Link to={props.to}>{props.text}</Link>
      ) : (
        <a onClick={props.onClick}>{props.text}</a>
      )}
    </li>
  );
}

export default Navbar;
