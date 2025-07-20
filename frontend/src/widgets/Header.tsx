
import { AppBar, Toolbar, Typography } from '@mui/material';

export const Header = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Oknedib CRM
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
