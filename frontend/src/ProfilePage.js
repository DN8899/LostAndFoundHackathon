import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const ProfilePage = ({ user, updateUserInfo }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const updatedUser = {
      username,
      email,
      password,
    };

    updateUserInfo(updatedUser);
    alert("Profile updated successfully!");
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: 'auto',
        padding: 3,
        borderRadius: 2,
        boxShadow: 2,
        backgroundColor: '#fff',
        marginTop: 4,
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
        Edit Profile
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          sx={{ mb: 3 }}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default ProfilePage;
