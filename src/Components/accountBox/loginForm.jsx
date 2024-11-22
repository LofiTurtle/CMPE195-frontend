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
import { useDispatch } from 'react-redux';
import { fetchUser } from "../slices/userSlice.js";

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async () => {
    try {
        const response = await fetch("/api/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password })
        });

        if (response.status !== 200) {
            throw new Error('Failed to login');
        }

        await dispatch(fetchUser());
        navigate('/dashboard');
    } catch (error) {
        console.log('failed login fetch:', error.message);
    }
};

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="username" placeholder="Username" onChange={e => setUsername(e.target.value)} value= {username}/>
        <Input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value= {password}/>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={login}>Sign in</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}