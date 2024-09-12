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
import { useNavigate } from "react-router-dom";
import { get, del } from "../utils/APIHandler"; // Import del function for deleting a bell

const BellList = () => {
  const [bells, setBells] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBells = async () => {
    try {
      const data = await get("/bells"); // Fetch bells from the backend
      setBells(data);
    } catch (error) {
      console.error("Failed to fetch bells:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBells();
  }, []);

  const handleOpen = () => navigate("/bell/add");

  const handleEdit = (bell) => {
    navigate(`/bell/${bell._id}/edit`, { state: { mode: "edit", bell } }); // Navigate to edit page with bell data
  };

  const handleDelete = async (id) => {
    try {
      await del(`/bells/${id}`); // Delete the bell by ID
      setBells((prevBells) => prevBells.filter((bell) => bell._id !== id)); // Update UI by removing the deleted bell
    } catch (error) {
      console.error("Failed to delete bell:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Bells
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
                <TableCell align="left">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bells.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body1" color="textSecondary">
                      No bells available
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                bells.map((bell, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{bell.bellId}</TableCell>
                    <TableCell align="left">{bell.bellName}</TableCell>
                    <TableCell align="left">{bell.status}</TableCell>
                    <TableCell align="center">
                      {/* Edit Button */}
                      <IconButton
                        aria-label="edit"
                        color="primary"
                        onClick={() => handleEdit(bell)}
                      >
                        <EditIcon />
                      </IconButton>

                      {/* Delete Button */}
                      <IconButton
                        aria-label="delete"
                        color="secondary"
                        onClick={() => handleDelete(bell._id)}
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

      {/* Floating Action Button for Adding a Bell */}
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
    </Container>
  );
};

export default BellList;
