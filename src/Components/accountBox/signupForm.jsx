import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import  {fetchUser } from '../slices/userSlice';
import { useDispatch } from 'react-redux';

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const navigate = useNavigate();
  const [match, setMatch] = useState(true);
  const dispatch = useDispatch();

  const signUp = async () => {
    if (password !== confirmPass) {
      setMatch(false);
      return;
    }
    if (email === "" || password === "" || confirmPass === "") {
      return;
    }
  
    try {
      const response = await fetch("/api/register", {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ username: userName, email: email, password: password, confirmPass: confirmPass })
      });
  
      if (response.status === 409) {
        // Handle the conflict error (e.g., username or email already exists)
        console.log('Username or email already exists');
        // You can set an error state here to display a message to the user
        return;
      }
  
      if (response.status !== 201) {
        throw new Error('Failed to register');
      }
  
      await dispatch(fetchUser());
      navigate('/dashboard');
    } catch (error) {
      console.log('Failed to register:', error);
    }
  };

  return (
    <BoxContainer>
      <FormContainer>
        <Input 
            type="text" 
            placeholder="User Name" 
            value={userName} 
            onChange={e => setUserName(e.target.value)}
        />
        <Input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
         />
        <Input type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)}
        />
        <Input 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPass} 
            onChange={e => setConfirmPass(e.target.value)}
        />
      </FormContainer>
      {!match && (
        <p style={{ color: "red" }}>Passwords don't match Please try again</p>
      )}
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={signUp}>Sign up</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}