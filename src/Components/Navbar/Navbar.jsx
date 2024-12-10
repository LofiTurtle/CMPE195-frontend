import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import SearchBox from './SearchBox';
import { fetchUser } from "../slices/userSlice.js";
import { 
  Home,
  Menu,
  Users,
  Gamepad2,
  PlusCircle,
  User
} from 'lucide-react';

export const Navbar = () => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [communities, setCommunities] = useState([]);
  const { userId, username, status } = useSelector((state) => state.user);
  const userExists = !!userId && !!username;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accountMenuRef = useRef(null);

  useEffect(() => {
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
    const fetchCommunities = async () => {
      try {
        const response = await fetch('/api/me');
        const data = await response.json();
        setCommunities(data.user.communities || []);
      } catch (error) {
        console.error('Error fetching communities:', error);
      }
    };

    fetchCommunities();
  }, []);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const logout = async () => {
    fetch('/api/logout', { method: 'POST' })
      .then(response => {
        if (response.status !== 200) throw new Error();
      })
      .catch(() => console.log('Error logging out.'))
      .finally(() => {
        navigate('/');
        setAccountMenuOpen(false);
      });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <nav>
        <Link to='/dashboard' className='Title'>Game Sphere</Link>
        <div className='search-bar'>
          <SearchBox />
        </div>
        <ul className='navbar-items'>
          <li>
            <button id='create-post-button' onClick={() => navigate('/create-post')}>
              New Post
            </button>
          </li>
          {userExists && (
            <li>
              <div className='menu-container' ref={accountMenuRef}>
                <div
                  className='menu-trigger'
                  onClick={() => {
                    setAccountMenuOpen(!accountMenuOpen);
                  }}
                >
                  <img src={`/api/users/${userId}/profile-picture`} alt="" className='w-9'/>
                </div>
                <div className={`dropdown-menu ${accountMenuOpen ? 'active' : 'inactive'}`}>
                  <ul onClick={() => setAccountMenuOpen(false)}>
                    <DropdownItem text="My Profile" to={`/users/${userId}`}/>
                    <DropdownItem text="Logout" onClick={logout}/>
                  </ul>
                </div>
              </div>
            </li>
          )}
        </ul>
      </nav>

      {/* Sidebar */}
      <div className={`sidebar ${!sidebarOpen ? 'sidebar-hidden' : ''}`}>
        <div className="sidebar-section">
          <Link to="/dashboard" className="sidebar-item">
            <Home size={20} />
            Home
          </Link>
          <Link to="/community" className="sidebar-item">
            <Users size={20} />
            Communities
          </Link>
          <Link to="/users" className="sidebar-item">
            <User size={20} />
            Users
          </Link>
          <Link to="/game-search" className="sidebar-item">
            <Gamepad2 size={20} />
            Game Search
          </Link>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-title">Your Communities</div>
          {communities.map(community => (
            <Link 
              key={community.id}
              to={`/community/${community.id}`}
              className="sidebar-item"
            >
              {community.name}
            </Link>
          ))}
          <Link to="/create-post" className="sidebar-item">
            <PlusCircle size={20} />
            Create Post
          </Link>
        </div>
      </div>

      {/* Overlay for mobile */}
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
        onClick={toggleSidebar}
      />

      {/* Main content wrapper */}
      <div className={`main-content ${!sidebarOpen ? 'main-content-full' : ''}`}>
       
      </div>
    </>
  );
};

function DropdownItem(props) {
  return (
    <li className='dropdown-item cursor-pointer'>
      {props.to ? (
        <Link to={props.to}>{props.text}</Link>
      ) : (
        <a onClick={props.onClick}>{props.text}</a>
      )}
    </li>
  );
}

export default Navbar;