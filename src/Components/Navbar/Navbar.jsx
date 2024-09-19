import React,  {useState} from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";


export const Navbar = () => {
  const [open, setOpen] = useState(false);

  const logout = async () => {
    fetch('/api/logout', { method: 'POST' })
      .then(response => {
        if (response.status != 200) {
          throw new Error();
        }
      })
      .then(() => navigate('/'))
      .catch(() => console.log('Error logging out.'))
  }

  return (
    <nav>
        <Link to='/dashboard' className='Title'> Game Sphere</Link>
        <ul className = 'navbar-items'>
            <li>
                <Link>
                    Comunity
                </Link>
            </li>
            <li>
                <Link>
                    <div className='menu-container'>
                        <div className='menu-trigger' onClick={()=>{setOpen(!open)}}> 
                            Account
                        </div>
                        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
                            <ul>
                                <DropdownItem  text = {"My profile"}/>
                                <DropdownItem  text = {"Logout"} onClick={logout}/>
                                <DropdownItem  text = {"setings"}/>
                            </ul>
                        </div>

                    </div>

                </Link>
            </li>
            
        </ul>
    </nav>
  );
}

function DropdownItem(props){
    return(
        <li className='dropdown-item'>
           <a> {props.text} </a> 
        </li>
    );
}


export default Navbar;