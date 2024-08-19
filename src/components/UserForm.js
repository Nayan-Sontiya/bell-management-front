import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { post, put } from "../utils/APIHandler"; // Import API methods

const UserFormPage = () => {
  const { state } = useLocation(); // Retrieve state from navigate
  const { mode, user } = state || {}; // Access mode and user from state
  const [username, setUsername] = useState(user ? user.username : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(user ? user.role : "user"); // Default role
  const [isVerified, setIsVerified] = useState(user ? user.isVerified : false);
  const [error, setError] = useState(""); // For error messages

  const navigate = useNavigate();

  // Fetch user details for editing (if needed)
  useEffect(() => {
    if (mode === "edit" && user) {
      setUsername(user.username);
      setEmail(user.email);
      setRole(user.role);
      setIsVerified(user.isVerified);
    }
  }, [mode, user]);

  const handleSubmit = async () => {
    // Prepare user data for submission
    const userData = { username, email, password, role, isVerified };

    try {
      if (mode === "edit") {
        // Call API to update user
        await put(`/users/${user._id}`, userData);
      } else {
        // Call API to add new user
        await post("/users", userData);
      }
      navigate("/users"); // Redirect to user list after success
    } catch (error) {
      console.error("Failed to submit user data:", error);
      setError("An error occurred while saving the user. Please try again."); // Set error message
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        {mode === "edit" ? "Edit User" : "Add New User"}
      </Typography>

      {error && (
        <Typography color="error" variant="body2" gutterBottom>
          {error}
        </Typography>
      )}

      <Grid container spacing={3}>
        {/* Username Field */}
        <Grid item xs={12}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
        </Grid>

        {/* Email Field */}
        <Grid item xs={12}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
        </Grid>

        {/* Password Field (only for adding new users) */}
        {mode === "add" && (
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
          </Grid>
        )}

        {/* Role Selection */}
        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <FormLabel component="legend" style={{ fontWeight: "bold" }}>
              Select Role
            </FormLabel>
            <TextField
              select
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              fullWidth
              required
              margin="normal"
              SelectProps={{
                native: true,
              }}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </TextField>
          </FormControl>
        </Grid>

        {/* Verification Status */}
        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <FormLabel component="legend" style={{ fontWeight: "bold" }}>
              Verified
            </FormLabel>
            <TextField
              select
              label="Verified"
              value={isVerified}
              onChange={(e) => setIsVerified(e.target.value === "true")}
              fullWidth
              required
              margin="normal"
              SelectProps={{
                native: true,
              }}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </TextField>
          </FormControl>
        </Grid>
      </Grid>

      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 3 }}
      >
        {mode === "edit" ? "Save Changes" : "Add User"}
      </Button>
    </Container>
  );
};

export default UserFormPage;
