import React, { useEffect, useState } from "react";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import {
  TextField,
  Box,
  Typography,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  styled,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

// Options for days to exclude
const dayOptions = [
  { label: "Sunday", value: 0 },
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
];

// Custom day styling to highlight selected dates
const CustomPickersDay = styled(PickersDay)(({ theme, selected }) => ({
  ...(selected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
}));

const CustomizableDateRangePicker = ({ setSelectedDates, selectedDates }) => {
  const [dateRanges, setDateRanges] = useState([null]);
  const [filteredDates, setFilteredDates] = useState([]);
  const [excludeDays, setExcludeDays] = useState([]);

  useEffect(() => {
    if (selectedDates) {
      setFilteredDates(selectedDates);
    }
  }, [selectedDates]);
  // Generate all dates in a range, excluding days
  const generateDates = (start, end) => {
    const dates = [];
    let currentDate = dayjs(start);

    while (
      currentDate.isBefore(dayjs(end)) ||
      currentDate.isSame(dayjs(end), "day")
    ) {
      dates.push(currentDate);
      currentDate = currentDate.add(1, "day");
    }

    return dates;
  };

  // Handle date range change
  const handleDateRangeChange = (index, newRange) => {
    const newRanges = [...dateRanges];
    newRanges[index] = newRange;
    setDateRanges(newRanges);
    updateFilteredDates(newRanges, excludeDays);
  };

  // Handle adding a new date range
  const handleAddDateRange = () => {
    setDateRanges([...dateRanges, [null, null]]);
  };

  // Handle removing a date range
  const handleRemoveDateRange = (index) => {
    const newRanges = dateRanges.filter((_, i) => i !== index);
    setDateRanges(newRanges);
    updateFilteredDates(newRanges, excludeDays);
  };

  // Handle excluding days
  const handleExcludeDayChange = (event) => {
    const selectedDays = event.target.value;
    setExcludeDays(selectedDays);
    updateFilteredDates(dateRanges, selectedDays);
  };

  // Update filtered dates based on current ranges and exclusions
  const updateFilteredDates = (ranges, excludedDays) => {
    const updatedDates = ranges.flatMap(([start, end]) =>
      start && end
        ? generateDates(start, end).filter(
            (date) => !excludedDays.includes(date.day())
          )
        : []
    );
    setFilteredDates(updatedDates);
    setSelectedDates(updatedDates);
  };

  // Handle removing a specific date
  const handleRemoveDate = (dateToRemove) => {
    console.log(dateRanges, "dateToRemove  => ", dateToRemove);
    const updatedDates = (filteredDates || []).filter(
      (date) => !dayjs(date).isSame(dateToRemove, "day")
    );
    setFilteredDates(updatedDates);
    setSelectedDates(updatedDates);
    if (dateRanges) {
      const updatedRanges = (dateRanges || []).map((value) => {
        if (!value) return;
        const [start, end] = value;
        return [
          start && !dayjs(dateToRemove).isBefore(start, "day") ? null : start,
          end && !dayjs(dateToRemove).isAfter(end, "day") ? null : end,
        ];
      });
      setDateRanges(updatedRanges);
    }
  };

  // Map day indices to labels
  const getDayLabel = (value) => {
    const day = dayOptions.find((day) => day.value === value);
    return day ? day.label : "";
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Typography variant="h6">Select Date Ranges</Typography>

        {dateRanges.map((range, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            <DateRangePicker
              startText="Start Date"
              endText="End Date"
              value={range}
              onChange={(newRange) => handleDateRangeChange(index, newRange)}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} />
                </>
              )}
              renderDay={(day, selectedDates, pickersDayProps) => (
                <CustomPickersDay
                  {...pickersDayProps}
                  selected={filteredDates.some((d) =>
                    dayjs(d).isSame(dayjs(day), "day")
                  )}
                >
                  {day.date()}
                </CustomPickersDay>
              )}
            />
            {dateRanges.length > 1 && (
              <Button onClick={() => handleRemoveDateRange(index)}>
                Remove Range
              </Button>
            )}
          </Box>
        ))}

        <Button onClick={handleAddDateRange} variant="contained">
          Add Another Date Range
        </Button>

        <Box sx={{ mt: 4 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="exclude-day-select-label">Exclude Days</InputLabel>
            <Select
              labelId="exclude-day-select-label"
              multiple
              value={excludeDays}
              onChange={handleExcludeDayChange}
              renderValue={(selected) => selected.map(getDayLabel).join(", ")}
            >
              {dayOptions.map((day) => (
                <MenuItem key={day.value} value={day.value}>
                  {day.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {filteredDates.length > 0 && (
            <>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Selected Dates:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {filteredDates.map((date, index) => (
                  <Chip
                    key={index}
                    label={dayjs(date).format("YYYY-MM-DD")}
                    onDelete={() => handleRemoveDate(date)}
                    color="primary"
                    sx={{ marginBottom: "4px" }}
                  />
                ))}
              </Box>
            </>
          )}
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default CustomizableDateRangePicker;
