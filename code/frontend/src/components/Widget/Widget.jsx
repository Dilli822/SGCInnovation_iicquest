import React from "react";
import { Typography, Button, Grid, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const Widget = () => {
  return (
    <Grid container spacing={2} alignItems="center" padding={4}>
      <Grid
        item
        xs={12}
        md={7}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box position="relative" display="inline-block">
          <Box
            sx={{
              position: "absolute",
              bottom: "-4px",
              left: "-4px",
              width: "32rem", // Increased width
              height: "20rem", // Increased height
              backgroundColor: "#4FC3F7",
              transform: "rotate(12deg)",
              zIndex: -1,
            }}
          ></Box>
          <Box
            component="img"
            src="https://media.istockphoto.com/id/1428194995/vector/idea-concept-with-one-line-bulbs-innovation-idea-process-of-untangling-wire-to-supply.jpg?s=612x612&w=0&k=20&c=955im8MKedyPep1Yd6z9myTWZM05p8iO8HSC5jzEU4k="
            alt="Smiling person"
            sx={{
              width: "34rem", // Increased width
              height: "20rem", // Increased height
              objectFit: "cover",
              borderRadius: "0.75rem",
              zIndex: 1,
              position: "relative",
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography gutterBottom sx={{ fontSize: "32px", fontWeight: "" }}>
          Take Care of Your Mental Health and Well-being
        </Typography>
        <Typography variant="body1" gutterBottom>
          Your mental health is just as important as your physical health. It's
          essential to take time to care for your emotional well-being and
          strengthen your resilience. Whether you're feeling stressed, anxious,
          or simply need a moment to recharge, remember that there are steps you
          can take to support yourself and others around you.
        </Typography>
        <Box mt={2}>
          <Button
            variant="contained"
            sx={{ mr: 2, backgroundColor: "#4FC3F7" }}
          >
            FOR YOU
          </Button>
          <Button variant="outlined" sx={{ color: "#4FC3F7" }}>
            FOR A FRIEND
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Widget />
    </ThemeProvider>
  );
};

export default App;
