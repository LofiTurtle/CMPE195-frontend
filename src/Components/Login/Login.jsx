import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css'
import EmailIcon from '../../assets/email.png'
import UserIcon from '../../assets/person.png'
import PasswordIcon from '../../assets/password.png'

const Login = () => {

    const [action,setAction] = useState("Login");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const signUp = async () => {
        fetch("/auth/register", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, username: email, password: password})
        })
          .then(response => {
            if (response.status != 201) {
                console.log()
                throw new Error()
            }
          })
          .then(() => {
            navigate('/dashboard')
        })
          .catch(() => console.log('failed register fetch'));
      };

   const login = async () => {
   await fetch("/auth/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username: email, password: password})
    })
        .then(response => {
            if(response.status != 200) {
                throw new Error()}
            })
        .then(() => navigate('/dashboard'))
        .catch(() => console.log('failed login fetch'))
    };

   function clearFields() {
       setName('')
       setEmail('')
       setPassword('')
    }

    return (
        <div className='container'>
            <div className='header'>
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className='inputs'>
                {action==="Sign Up" &&
                    <div className='input'>
                    <img src={UserIcon} alt='user'/>
                    <input type='text' placeholder='Name' value={name} onChange={e => setName(e.target.value)}/>
                    </div>
                }
                <div className='input'>
                    <img src={EmailIcon} alt='email'/>
                    <input type='email' placeholder='Email Id' value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className='input'>
                    <img src={PasswordIcon} alt='password'/>
                    <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
            </div>
            <div className="submit-container">
                {action==="Sign Up" ?    
                <div className="submit" onClick={signUp}>Sign Up</div> :  
                <div className="submit" onClick={login}>Login</div>
                }
            </div>
            {action==="Sign Up" ? 
            <div className="navigation">Existing Member? <span onClick={()=>{setAction("Login"); clearFields()}}>Login</span></div> : 
            <div>
                <div className="navigation">Lost Password? <span>Click Here!</span></div>
                <div className="navigation">New Member? <span  onClick={()=>{setAction("Sign Up"); clearFields()}}>Sign up now</span></div>
            </div>
            }
        </div>
    )
}

export default Login