import React from "react";
import { Typography, Button, Grid, Stack, Box } from "@mui/material";
import { Height } from "@mui/icons-material";
function Community() {
  return (
    <Stack spacing={2}>
      <Grid container>
        <Grid
          item
          md="12"
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4"> Features</Typography>
          <Typography variant="h6"> bla bla bla</Typography>
        </Grid>
        <Grid item md="12">
          <Grid item md="6"></Grid>
          <Grid item md="6"></Grid>
        </Grid>
        <Grid item md="12"></Grid>
        <Grid item md="12"></Grid>
        <Grid item md="12"></Grid>
      </Grid>
    </Stack>
  );
}

export default Community;
