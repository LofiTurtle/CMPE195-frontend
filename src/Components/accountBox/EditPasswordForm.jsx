// src/Components/accountBox/EditPasswordForm.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserPassword } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import './EditPasswordForm.css';

function EditPasswordForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.user);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [formError, setFormError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== verifyPassword) {
            setFormError('New passwords do not match.');
            return;
        }

        try {
            await dispatch(updateUserPassword({user, oldPassword, newPassword })).unwrap();
            navigate('/profile');
        } catch (err) {
            setFormError(err.message || 'Failed to update password.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Old Password:</label>
                <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>New Password:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Verify New Password:</label>
                <input
                    type="password"
                    value={verifyPassword}
                    onChange={(e) => setVerifyPassword(e.target.value)}
                    required
                />
            </div>
            {formError && <div className="error">{formError}</div>}
            {status === 'failed' && <div className="error">Error: {error}</div>}
            <button type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Updating...' : 'Change Password'}
            </button>
        </form>
    );
}

export default EditPasswordForm;