import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../navBar";
import { AccountContext } from "./accountContext";
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const login = async () => {
    await fetch("/auth/login", {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({email: email, password: password})
     })
         .then(response => {
             if(response.status != 200) {
                 throw new Error()}
             })
         .then(() => navigate('/dashboard'))
         .catch(() => console.log('failed login fetch'))
     };

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} value= {email}/>
        <Input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value= {password}/>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onclick={login}>Sign in</SubmitButton>
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