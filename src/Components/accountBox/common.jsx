import styled from "styled-components";

export const BoxContainer = styled.div`
  
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 90px;
  
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 1px 2.5px rgba(200, 200, 200, 0.5);
  
`;

export const MutedLink = styled.a`
  font-size: 15px;
  color: 000;
  font-weight: 500;
  text-decoration: none;
  margin: 5px;
`;

export const BoldLink = styled.a`
  font-size: 15px;
  color: rgba(123, 121, 181, 256);
  font-weight: 500;
  text-decoration: none;
  margin: 0 10px;
`;

export const Input = styled.input`
  width: 100%;
  height: 50px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.5);
  padding: 0px 20px;
  border-bottom: 1.4px solid transparent;
  transition: all 200ms ease-in-out;
  font-size: 12px;

  &::placeholder {
    color: #000;
  }

  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid rgb(241, 196, 15);
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  margin-top: 30px;
  padding: 11px 40%;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: rgb(241, 196, 15);
  background: linear-gradient(
    20deg,
    rgba(100, 98, 147, 255) 5%,
    rgba(123, 121, 181, 256) 100%
  );

  &:hover {
    filter: brightness(1.03);
  }
`;