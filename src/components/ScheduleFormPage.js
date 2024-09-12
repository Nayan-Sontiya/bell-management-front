import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  InputLabel,
  Box,
  Chip,
} from "@mui/material";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import { get, post, put } from "../utils/APIHandler";
import CustomizableDateRangePicker from "../common/MultiRangeDatePicker";
import customParseFormat from "dayjs/plugin/customParseFormat";

// Enable parsing of custom formats
dayjs.extend(customParseFormat);

const ScheduleFormPage = () => {
  const { state } = useLocation();
  const { mode, schedule } = state || {};

  const [bells, setBells] = useState([]);
  const [selectedBell, setSelectedBell] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedTime, setSelectedTime] = useState(dayjs());
  const [times, setTimes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBells = async () => {
      try {
        const data = await get("/bells?status=active");
        setBells(data);
      } catch (error) {
        console.error("Failed to fetch bells:", error);
      }
    };

    fetchBells();

    if (mode === "edit" && schedule) {
      setSelectedBell(schedule.bellId);
      // Use dayjs to parse dates correctly
      setDateRange([
        dayjs(schedule.startDateTime).startOf("day"),
        dayjs(schedule.endDateTime).endOf("day"),
      ]);
      setSelectedDates(schedule.selectedDates.map((date) => dayjs(date)));
      setTimes(schedule.selectedTimes.map((time) => dayjs(time)));
    }
  }, [mode, schedule]);
  console.log("selectedDates  => ", selectedDates);
  const onSubmit = async (scheduleData) => {
    try {
      if (mode === "edit") {
        await put(`/schedules/${schedule._id}`, scheduleData);
      } else {
        await post("/schedules", scheduleData);
      }
      navigate("/schedules");
    } catch (error) {
      console.error("Failed to submit schedule data:", error);
    }
  };

  const handleSubmit = () => {
    if (!selectedBell) {
      console.error("Bell must be selected");
      return;
    }

    const combinedDates = selectedDates.map((date) => date.toISOString());

    const combinedTimes = times.map((time) => time.toISOString());

    onSubmit({
      bellId: selectedBell,
      bellName: bells.find((bell) => bell._id === selectedBell)?.bellName || "",
      startDateTime: dateRange[0]?.toISOString(),
      endDateTime: dateRange[1]?.toISOString(),
      selectedDates: combinedDates,
      selectedTimes: combinedTimes, // Store multiple times
    });
  };

  const handleAddTime = () => {
    const formattedSelectedTime = selectedTime.format("HH:mm A");
    const isDuplicate = times.some(
      (time) => time.format("HH:mm A") === formattedSelectedTime
    );

    if (isDuplicate) {
      console.error("Duplicate time selected");
      return;
    }

    setTimes([...times, selectedTime]);
  };

  const handleRemoveTime = (index) => {
    const newTimes = times.filter((_, i) => i !== index);
    setTimes(newTimes);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        {mode === "edit" ? "Edit Schedule" : "Add New Schedule"}
      </Typography>

      <Grid container spacing={3}>
        {/* Bell Selection Dropdown */}
        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="bell-select-label">Select Bell</InputLabel>
            <Select
              labelId="bell-select-label"
              value={selectedBell}
              onChange={(e) => setSelectedBell(e.target.value)}
              required
            >
              {bells.map((bell) => (
                <MenuItem key={bell._id} value={bell._id}>
                  {bell.bellName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Date Range Picker */}
        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <CustomizableDateRangePicker
              dateRange={dateRange}
              onDateRangeChange={(range) => setDateRange(range)}
              selectedDates={selectedDates}
              setSelectedDates={setSelectedDates}
            />
          </FormControl>
        </Grid>

        {/* Static Time Picker */}
        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <FormLabel component="legend" style={{ fontWeight: "bold" }}>
              Select Time
            </FormLabel>
            <StaticTimePicker
              displayStaticWrapperAs="desktop"
              value={selectedTime}
              onChange={(newTime) => setSelectedTime(newTime)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  InputLabelProps={{ shrink: false }}
                />
              )}
              disableOpenPicker
              getOpenDialogAriaText={() => "Open time picker"}
            />
          </FormControl>
        </Grid>

        {/* Button to add selected time */}
        <Grid item xs={12}>
          <Button onClick={handleAddTime} variant="contained" sx={{ mt: 2 }}>
            Add Time
          </Button>
        </Grid>

        {/* Display Selected Times in Chip Format */}
        <Grid item xs={12}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {times.map((time, index) => (
              <Chip
                key={index}
                label={time.format("hh:mm A")} // Format the time to show AM/PM
                onDelete={() => handleRemoveTime(index)}
                color="primary"
              />
            ))}
          </Box>
        </Grid>
      </Grid>

      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 3 }}
      >
        {mode === "edit" ? "Save Changes" : "Add Schedule"}
      </Button>
    </Container>
  );
};

export default ScheduleFormPage;
