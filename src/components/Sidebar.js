import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { styled } from "@mui/system";

// Styled components for active state
const StyledListItem = styled(ListItem)(({ isActive }) => ({
  backgroundColor: isActive ? "#e0e0e0" : "inherit", // Light gray for active item
  fontWeight: isActive ? "bold" : "normal", // Bold text for active item
}));

const StyledTypography = styled(Typography)(({ isActive }) => ({
  fontWeight: isActive ? "bold" : "normal", // Bold text for active item
}));

const Sidebar = () => {
  const location = useLocation(); // Get current route

  // Function to check if the current route is active for a specific path
  const isOthersAlsoActive = (paths) =>
    paths.some((path) => location.pathname.startsWith(path));

  return (
    <div>
      <List>
        <NavLink to="/bells" style={{ textDecoration: "none" }}>
          {({ isActive }) => (
            <StyledListItem
              button
              isActive={isActive || isOthersAlsoActive(["/bells", "/bell/add"])}
            >
              <StyledTypography
                variant="body1"
                isActive={
                  isActive || isOthersAlsoActive(["/bells", "/bell/add"])
                }
              >
                Bell List
              </StyledTypography>
            </StyledListItem>
          )}
        </NavLink>
        <Divider />
        <NavLink to="/schedules" style={{ textDecoration: "none" }}>
          {({ isActive }) => (
            <StyledListItem
              button
              isActive={
                isActive || isOthersAlsoActive(["/schedules", "/schedule/add"])
              }
            >
              <StyledTypography
                variant="body1"
                isActive={
                  isActive ||
                  isOthersAlsoActive(["/schedules", "/schedule/add"])
                }
              >
                Schedules
              </StyledTypography>
            </StyledListItem>
          )}
        </NavLink>
        <Divider />
      </List>
      <Divider />
    </div>
  );
};

export default Sidebar;
