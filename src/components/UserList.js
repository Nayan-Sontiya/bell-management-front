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
  Container,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router-dom";
import { get } from "../utils/APIHandler";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const data = await get("/users"); // Use the API handler's get method
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = () => navigate("/user/add");

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Users
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
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Role</TableCell>
                <TableCell align="left">Verified</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body1" color="textSecondary">
                      No users available
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell align="left">{user.username}</TableCell>
                    <TableCell align="left">{user.email}</TableCell>
                    <TableCell align="left">{user.role}</TableCell>
                    <TableCell align="left">
                      {user.isVerified ? "Verified" : "Not Verified"}
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
        onClick={handleAddUser}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default UserList;
