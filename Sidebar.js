import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
const drawerWidth = 220;

const SideBar = ({ handleSelect }) => {
  const sidetop = ["attendance", "Salary", "Send email", "Drafts"];

  const sidebottom = ["Shift", "Trash", "Spam"];

  const [openCreateUser, setOpenCreateUser] = React.useState(true);
  const [openPaySlip, setOpenPaySlip] = React.useState(true);

  const handleClickCreateUser = () => {
    setOpenCreateUser(!openCreateUser);
    console.log(openCreateUser);
  };

  const handleClickPaySlip = () => {
    setOpenPaySlip(!openPaySlip);
    console.log(openPaySlip);
  };

  const handleSelectValue = (e) => {
    handleSelect = e;
    console.log(handleSelect);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "rgb(15, 80, 155)",
            color: "White",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              <ListItemButton>
                <ListItemIcon style={{ color: "white" }}>
                  <ApartmentOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </Link>
            <Link
              to="/attendance"
              style={{ color: "white", textDecoration: "none" }}
            >
              <ListItemButton>
                <ListItemIcon style={{ color: "white" }}>
                  <EventAvailableIcon />
                </ListItemIcon>
                <ListItemText primary="Attendance" />
              </ListItemButton>
            </Link>
          </List>
          <Divider style={{ backgroundColor: "white", color: "white" }} />
          <List>
          <Link
              to="/admin-profile"
              style={{ color: "white", textDecoration: "none" }}
            >
              <ListItemButton>
                <ListItemIcon style={{ color: "white" }}>
                  <PersonOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </Link>
            {/* <Link
              to="/create-user"
              style={{ color: "white", textDecoration: "none" }}
            >
              <ListItemButton>
                <ListItemIcon style={{ color: "white" }}>
                  <PersonAddAltIcon />
                </ListItemIcon>
                <ListItemText primary="Create User" />
              </ListItemButton>
            </Link> */}

            <ListItemButton onClick={handleClickCreateUser}>
              <ListItemIcon style={{ color: "white" }}>
                <PersonAddAltIcon />
              </ListItemIcon>
              <ListItemText primary="Create User" />
              {openCreateUser ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openCreateUser} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
              <Link
                  to="/S_JobInformation"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  {" "}
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon style={{ color: "white" }}>
                      <EventAvailableIcon />
                    </ListItemIcon>
                    <ListItemText primary="Employee Registration" />
                  </ListItemButton>
                </Link>
                <Link
                  to="/viewemployee"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  {" "}
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon style={{ color: "white" }}>
                      <EventAvailableIcon />
                    </ListItemIcon>
                    <ListItemText primary="View Employees" />
                  </ListItemButton>
                </Link>
                <Link
                  to="/employeeprofile"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  {" "}
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon style={{ color: "white" }}>
                    <PersonOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary="Employee Profile" />
                </ListItemButton>
                </Link>
              </List>
              
            </Collapse>

            <Link
              to="/shift-details"
              style={{ color: "white", textDecoration: "none" }}
            >
              <ListItemButton>
                <ListItemIcon style={{ color: "white" }}>
                  <PublishedWithChangesIcon />
                </ListItemIcon>
                <ListItemText primary="Shift Management" />
              </ListItemButton>
            </Link>
            <Link
              to="salary"
              style={{ color: "white", textDecoration: "none" }}
            >
              <ListItemButton>
                <ListItemIcon style={{ color: "white" }}>
                  <CurrencyRupeeOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Salary" />
              </ListItemButton>
            </Link>
            <ListItemButton onClick={handleClickPaySlip}>
              <ListItemIcon style={{ color: "white" }}>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Pay-Slip" />
              {openPaySlip ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openPaySlip} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link
                  to="/attendance"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  {" "}
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon style={{ color: "white" }}>
                      <EventAvailableIcon />
                    </ListItemIcon>
                    <ListItemText primary="Monthly" />
                  </ListItemButton>
                </Link>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon style={{ color: "white" }}>
                    <EventBusyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Yearly" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default SideBar;
