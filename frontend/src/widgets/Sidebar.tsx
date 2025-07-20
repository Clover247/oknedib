
import { Drawer, List, ListItemText, Toolbar } from '@mui/material';
import { ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

export const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        <ListItemButton component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={Link} to="/projects">
          <ListItemText primary="Projects" />
        </ListItemButton>
        <ListItemButton component={Link} to="/settings">
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};
