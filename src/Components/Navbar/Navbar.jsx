import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";


import "./Navbar.css";
import SearchBox from './SearchBox';
import {fetchUser} from "../slices/userSlice.js";

export const Navbar = () => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const {userId} = useSelector((state) => state.user);

  const navigate = useNavigate(); // To navigate after logout
  const dispatch = useDispatch();

  const accountMenuRef = useRef(null);

  useEffect(() => {
    // Handle clicking outside the search type dropdown
    const handleClickOutside = (event) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target) && accountMenuOpen) {
        setAccountMenuOpen(false);
      }
    };

    if (accountMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [accountMenuOpen]);

  useEffect(() => {
    dispatch(fetchUser()); // Dispatch the fetchUser action, to get the slices
  }, [dispatch]);

  const logout = async () => {
    fetch('/api/logout', {method: 'POST'})
      .then(response => {
        if (response.status !== 200) {
          throw new Error();
        }
      })
      .then(() => {
        navigate('/');
        setAccountMenuOpen(false);
      })
      .catch(() => console.log('Error logging out.'));
  };

  return (<nav>
    <Link to='/dashboard' className='Title'>Game Sphere</Link>


    <div className='search-bar'>
      <SearchBox/>
    </div>

    <ul className='navbar-items'>

      <li>
        <button onClick={() => navigate('/create-post')}>New Post</button>
      </li>

      {/* Account Section */}
      <li>
        <div className='menu-container' ref={accountMenuRef}>
          <div
            className='menu-trigger'

            onClick={() => {
              setAccountMenuOpen(!accountMenuOpen);
            }}
          >
            <img src={`/api/users/${userId}/profile-picture`} alt="" className={'w-9'}/>
          </div>
          <div className={`dropdown-menu ${accountMenuOpen ? 'active' : 'inactive'}`}>
            <ul>
              <DropdownItem text={"My Profile"} to=""/>
              <DropdownItem text={"Settings"} to="/settings"/>
              <DropdownItem text={"Logout"} onClick={logout}/>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </nav>);
};

function DropdownItem(props) {
  return (<li className='dropdown-item'>
    {props.to ? (<Link to={props.to}>{props.text}</Link>) : (<a onClick={props.onClick}>{props.text}</a>)}
  </li>);
}

export default Navbar;
