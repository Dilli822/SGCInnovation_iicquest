import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Grid,
} from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";

function HeaderNav() {
  return (
    <AppBar position="static" sx={{ bgcolor: "white" }}>
      <Toolbar>
        {/* <IconButton size="large" edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton> */}
        <Grid
          container
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Grid item>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "#4FC3F7" }}
            >
              LOGO
            </Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" sx={{ color: "#4FC3F7", mr: 2 }}>
              Home
            </Button>
            <Button color="inherit" sx={{ color: "#4FC3F7", mr: 2 }}>
              Features
            </Button>
            <Button color="inherit" sx={{ color: "#4FC3F7", mr: 2 }}>
              Pricing
            </Button>
            <Button color="inherit" sx={{ color: "#4FC3F7", mr: 2 }}>
              About
            </Button>
            <Button color="inherit" sx={{ color: "#4FC3F7", mr: 2 }}>
              Contact
            </Button>
            <IconButton sx={{ mr: 2 }}>
              <NotificationsIcon
                color="inherit"
                sx={{ ":hover": { color: "#4FC3F7" } }}
              />
            </IconButton>
            <Button color="inherit" sx={{ bgcolor: "#4FC3F7", mr: 2 }}>
              Login
            </Button>
            <Button color="inherit" sx={{ bgcolor: "#4FC3F7" }}>
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderNav;
