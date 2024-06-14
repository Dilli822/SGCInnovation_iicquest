import BreathingExercise from "./engadgement";
import Quiz from "./quizGame";
import { Typography, Button, Grid, Box } from "@mui/material";
import { Route, Routes, Link } from "react-router-dom";

export default function MasterEngagement(){
    return(
        <>

        <Grid container>
            <Grid item md={12}>
            <BreathingExercise/>
            <br />
            </Grid>

  

       

           

            <Quiz/>
        </Grid>
   
        </>
    )
}