import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  SubmitButton,
} from "./common"; // Assuming these components exist and are styled appropriately
import { Marginer } from "../navBar"; // Assuming this component is a styled margin helper

export function EditProfileForm() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  const updateProfile = async () => {
    if (email === "" || userName === "") {
      console.log("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("username", userName);
    formData.append("email", email);
    formData.append("password", password);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    fetch("/auth/update-profile", {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to update profile");
        }
        return response.json();
    })
    .then(() => {
        navigate('/dashboard');
    })
    .catch(error => console.error('Error updating profile:', error));
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
        <Input
            type="password"
            placeholder="New Password (leave blank if unchanged)"
            value={password}
            onChange={e => setPassword(e.target.value)}
        />
        <Input
            type="file"
            onChange={e => setProfilePicture(e.target.files[0])}
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={updateProfile}>Update Profile</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <BoldLink href="#" onClick={() => navigate('/dashboard')}>
        Cancel
      </BoldLink>
    </BoxContainer>
  );
}

export default EditProfileForm;
