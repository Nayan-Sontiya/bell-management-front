// src/pages/BellFormPage.js
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
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import { post, put } from "../utils/APIHandler"; // Import API utility functions

const BellFormPage = () => {
  const { state } = useLocation(); // Retrieve state from navigate
  const { mode, bell } = state || {}; // Access mode and bell from state
  const [bellName, setBellName] = useState(bell ? bell.bellName : "");
  const [date, setDate] = useState(bell ? bell.dateTime : dayjs());
  const [time, setTime] = useState(bell ? bell.dateTime : dayjs());

  const navigate = useNavigate();

  useEffect(() => {
    if (mode === "edit" && bell) {
      setBellName(bell.bellName);
      setDate(dayjs(bell.dateTime));
      setTime(dayjs(bell.dateTime));
    }
  }, [mode, bell]);

  const onSubmit = async (bellData) => {
    try {
      if (mode === "edit") {
        await put(`/bells/${bell._id}`, bellData); // Update bell
      } else {
        await post("/bells", bellData); // Add new bell
      }
      navigate("/bells");
    } catch (error) {
      console.error("Failed to submit bell data:", error);
    }
  };

  const handleSubmit = () => {
    // Merge date and time for submission
    const combinedDateTime = date.hour(time.hour()).minute(time.minute());
    onSubmit({ bellName, dateTime: combinedDateTime });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        {mode === "edit" ? "Edit Bell" : "Add New Bell"}
      </Typography>

      <Grid container spacing={3}>
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

        {/* Date Picker */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <FormLabel component="legend" style={{ fontWeight: "bold" }}>
              Select Date
            </FormLabel>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              value={date}
              onChange={(newDate) => setDate(newDate)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  InputLabelProps={{ shrink: false }} // Hide internal label
                />
              )}
              disableOpenPicker
              getOpenDialogAriaText={() => "Open date picker"}
            />
          </FormControl>
        </Grid>

        {/* Time Picker */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <FormLabel component="legend" style={{ fontWeight: "bold" }}>
              Select Time
            </FormLabel>
            <StaticTimePicker
              displayStaticWrapperAs="desktop"
              value={time}
              onChange={(newTime) => setTime(newTime)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  InputLabelProps={{ shrink: false }} // Hide internal label
                />
              )}
              disableOpenPicker
              getOpenDialogAriaText={() => "Open time picker"}
            />
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
