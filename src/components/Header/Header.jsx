import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            OnGrid Test Project
          </Typography>
          <Button
            component="a"
            href="https://github.com/dosjcq"
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            <Typography variant="h6">dosjcq</Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
