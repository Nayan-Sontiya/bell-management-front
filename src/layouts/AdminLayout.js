import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Drawer,
  Divider,
  Button,
  Avatar,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const drawerWidth = 240; // Set sidebar width

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const { user, logout } = React.useContext(UserContext);

  // Redirect to login page if user is not logged in
  React.useEffect(() => {
    if (!user) {
      navigate("/login"); // Replace with your login route
    }
  }, [user, navigate]);

  const handleLogout = () => {
    // Implement logout logic here
    logout();
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Header */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1, // Make sure the header stays on top of the sidebar
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Bell Management System
          </Typography>
          {user && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                {user.username} {/* Display user name */}
              </Typography>
              <Avatar sx={{ mr: 2 }}>{user.username[0]}</Avatar>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Divider />
        <Sidebar />
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
        }}
      >
        {/* Push content below header */}
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
