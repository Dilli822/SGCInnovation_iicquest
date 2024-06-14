import React from "react";
import { Grid, Typography, Link, Box, Button } from "@mui/material";

const Join = () => {
  return (
    <>
            <hr />
 
    <Grid container spacing={2} alignItems="center" padding={4}>
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "",
          alignItems: "",
          textAlign: "",
          padding: "0 2rem",
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{ fontSize: "32px", fontWeight: "" }}
        >
          Thrive Together: Wellness Hub
        </Typography>
        <Typography variant="body1" gutterBottom>
          Empower yourself to take charge of your mental health. Join a
          supportive community, access valuable resources, and find the support
          you need to thrive in your journey.
        </Typography>

        <Link
          mt={2}
          href="http://localhost:9000/"
          underline="none"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
       
            sx={{
            
              bgcolor: "#4FC3F7",
              color: "#fff",
              fontSize: "18px",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: 1,
              borderRadius: "5px",
              "&:hover": {
                bgcolor: "white",
                color: "#4FC3F7",
                border: "1px solid #4FC3F7",
                borderRadius: "10px",
              },
            }}
          >
            Join Room
          </Button>
        </Link>

      </Grid>
      <Grid
        item
        xs={12}
        md={7}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box position="relative" display="inline-block">
          
          {/* <Box
            sx={{
              position: "absolute",
              bottom: "-4px",
              left: "-4px",
              width: "32rem",
              height: "20rem",
              backgroundColor: "#4FC3F7",
              transform: "rotate(12deg)",
              zIndex: -1,
            }}
          ></Box> */}
          <Box
            component="img"
            src="https://raw.githubusercontent.com/aakashstha1/Susthiti/main/Group.jpg"
            alt="Placeholder"
            sx={{
              width: "34rem",
              height: "20rem",
              objectFit: "contain",
              borderRadius: "0.75rem",
              zIndex: 1,
              position: "relative",
            }}
          />
        </Box>
      </Grid>
    </Grid>
    </>
  );
};

export default Join;
