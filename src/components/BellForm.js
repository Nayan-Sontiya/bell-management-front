import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { post, put } from "../utils/APIHandler"; // Import API utility functions

const BellFormPage = () => {
  const { state } = useLocation(); // Retrieve state from navigate
  const { mode, bell } = state || {}; // Access mode and bell from state

  const [bellId, setBellId] = useState(bell ? bell.bellId : ""); // Initialize bellId state
  const [bellName, setBellName] = useState(bell ? bell.bellName : ""); // Initialize bellName state
  const [status, setStatus] = useState(bell ? bell.status : "active"); // Initialize status state
  const [id, setId] = useState(bell ? bell._id : ""); // Initialize _id state (for existing records)

  const navigate = useNavigate();

  useEffect(() => {
    if (mode === "edit" && bell) {
      setBellId(bell.bellId);
      setBellName(bell.bellName);
      setStatus(bell.status); // Set status for the record
      setId(bell._id); // Set _id for the record
    }
  }, [mode, bell]);

  const onSubmit = async (bellData) => {
    try {
      if (mode === "edit") {
        await put(`/bells/${id}`, bellData); // Update bell using _id
      } else {
        await post("/bells", bellData); // Add new bell
      }
      navigate("/bells");
    } catch (error) {
      console.error("Failed to submit bell data:", error);
    }
  };

  const handleSubmit = () => {
    const bellData = { bellId, bellName, status }; // Include status in the data to be submitted
    onSubmit(bellData);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        {mode === "edit" ? "Edit Bell" : "Add New Bell"}
      </Typography>

      <Grid container spacing={3}>
        {/* Bell ID Field */}
        <Grid item xs={12}>
          <TextField
            label="Bell ID"
            value={bellId}
            onChange={(e) => setBellId(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
        </Grid>

        {/* Bell Name Field */}
        <Grid item xs={12}>
          <TextField
            label="Bell Name"
            value={bellName}
            onChange={(e) => setBellName(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
        </Grid>

        {/* Status Dropdown */}
        <Grid item xs={12}>
          <FormControl fullWidth required margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
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
        {mode === "edit" ? "Save Changes" : "Add Bell"}
      </Button>
    </Container>
  );
};

export default BellFormPage;
