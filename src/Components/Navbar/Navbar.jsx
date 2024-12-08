import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import "./Navbar.css";
import SearchBox from './SearchBox';
import {fetchUser} from "../slices/userSlice.js";

export const Navbar = () => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

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
      .catch(() => console.log('Error logging out.'))
      .finally(() => {
        navigate('/');
        setAccountMenuOpen(false);
      });
  };

  return (<nav>
    <Link to='/dashboard' className='Title'>Game Sphere</Link>


    <div className='search-bar'>
      <SearchBox/>
    </div>

    <ul className='navbar-items'>

      <li>
        <button id={'create-post-button'} onClick={() => navigate('/create-post')}>New Post</button>
      </li>

      {/* Account Section */}
      {currentUser && (<li>
        <div className='menu-container' ref={accountMenuRef}>
          <div
            className='menu-trigger'

            onClick={() => {
              setAccountMenuOpen(!accountMenuOpen);
            }}
          >
            <img src={`/api/users/${currentUser.id}/profile-picture`} alt="" className={'w-9'}/>
          </div>
          <div className={`dropdown-menu ${accountMenuOpen ? 'active' : 'inactive'}`}>
            <ul onClick={() => setAccountMenuOpen(false)}>
              <DropdownItem text={"My Profile"} to={`/users/${currentUser.id}`}/>
              <DropdownItem text={"Logout"} onClick={logout}/>
            </ul>
          </div>
        </div>
      </li>)}
    </ul>
  </nav>);
};

function DropdownItem(props) {
  return (<li className='dropdown-item cursor-pointer'>
    {props.to ? (<Link to={props.to}>{props.text}</Link>) : (<a onClick={props.onClick}>{props.text}</a>)}
  </li>);
}

export default Navbar;
