import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
  IconButton,
} from "@mui/material";
import { format } from "date-fns";
import CloseIcon from "@mui/icons-material/Close";

const ScheduleModal = ({ open, onClose, schedule }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{ bgcolor: "primary.main", color: "white", position: "relative" }}
      >
        Schedule Details
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ padding: 4 }}>
        <Typography variant="h6" gutterBottom>
          Bell ID: <strong>{schedule.bellId}</strong>
        </Typography>
        <Typography variant="h6" gutterBottom>
          Bell Name: <strong>{schedule.bellName}</strong>
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Selected Dates:
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          {schedule.selectedDates.length > 0 ? (
            schedule.selectedDates.map((date, index) => (
              <Chip
                key={index}
                label={format(new Date(date), "yyyy-MM-dd")}
                color="primary"
                sx={{ bgcolor: "secondary.light" }}
              />
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No dates selected
            </Typography>
          )}
        </Box>

        <Typography variant="h6" gutterBottom>
          Selected Times:
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {schedule.selectedTimes.length > 0 ? (
            schedule.selectedTimes.map((time, index) => (
              <Chip
                key={index}
                label={format(new Date(time), "hh:mm a")}
                color="secondary"
                sx={{ bgcolor: "primary.light" }}
              />
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No times selected
            </Typography>
          )}
        </Box>

        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          sx={{ mt: 2, alignSelf: "flex-end" }}
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleModal;
