import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Fab,
  IconButton,
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { get, del } from "../utils/APIHandler"; // Import del function for deleting a schedule
import ScheduleDetailsModal from "./ScheduleDetailsModal";

const ScheduleList = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchSchedules = async () => {
    try {
      const data = await get("/schedules"); // Fetch schedules from the backend
      setSchedules(data);
    } catch (error) {
      console.error("Failed to fetch schedules:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleOpen = () => navigate("/schedule/add");

  const handleEdit = (schedule) => {
    navigate(`/schedule/${schedule._id}/edit`, {
      state: { mode: "edit", schedule },
    }); // Navigate to edit page with schedule data
  };

  const handleDelete = async (id) => {
    try {
      await del(`/schedules/${id}`); // Delete the schedule by ID
      setSchedules((prevSchedules) =>
        prevSchedules.filter((schedule) => schedule._id !== id)
      ); // Update UI by removing the deleted schedule
    } catch (error) {
      console.error("Failed to delete schedule:", error);
    }
  };

  const handleView = (schedule) => {
    setSelectedSchedule(schedule);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSchedule(null);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Schedules
      </Typography>

      {loading ? (
        <Typography variant="body1" color="textSecondary">
          Loading...
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Bell ID</TableCell>
                <TableCell align="left">Bell Name</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedules.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body1" color="textSecondary">
                      No schedules available
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                schedules.map((schedule) => (
                  <TableRow key={schedule._id}>
                    <TableCell align="left">{schedule.bellId}</TableCell>
                    <TableCell align="left">{schedule.bellName}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="view"
                        color="default"
                        onClick={() => handleView(schedule)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        aria-label="edit"
                        color="primary"
                        onClick={() => handleEdit(schedule)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        color="secondary"
                        onClick={() => handleDelete(schedule._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Floating Action Button for Adding a Schedule */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
        }}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>

      {/* Schedule Details Modal */}
      {selectedSchedule && (
        <ScheduleDetailsModal
          open={modalOpen}
          onClose={handleCloseModal}
          schedule={selectedSchedule}
        />
      )}
    </Container>
  );
};

export default ScheduleList;
