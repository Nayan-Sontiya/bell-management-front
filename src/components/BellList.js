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
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { get } from "../utils/APIHandler";

const BellList = () => {
  const [bells, setBells] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBells = async () => {
    try {
      const data = await get("/bells"); // Use the API handler's get method
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
                <TableCell align="left">Bell Name</TableCell>
                <TableCell align="left">Scheduled Date & Time</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bells.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography variant="body1" color="textSecondary">
                      No bells available
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                bells.map((bell, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{bell.bellName}</TableCell>
                    <TableCell align="left">
                      {new Date(bell.dateTime).toLocaleString()}
                    </TableCell>
                    <TableCell align="left">
                      {bell.isFired ? "Fired" : "Not Fired"}
                    </TableCell>
                    <TableCell align="center">
                      <Button size="small" variant="contained" color="primary">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Floating Action Button */}
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
