import React, { useState, useEffect } from "react";
import { Button, Box, Typography, Container } from "@mui/material";
import "./engadgement.css";

const BreathingExercise = () => {
  const [timer, setTimer] = useState(0);
  const [phase, setPhase] = useState("inhale");

  useEffect(() => {
    let interval;
    if (phase === "inhale") {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer >= 3) {
            setPhase("hold");
            setTimer(0);
            return 0;
          }
          return prevTimer + 1;
        });
      }, 1000);
    } else if (phase === "hold") {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer >= 7) {
            setPhase("exhale");
            setTimer(0);
            return 0;
          }
          return prevTimer + 1;
        });
      }, 1000);
    } else if (phase === "exhale") {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer >= 4) {
            setPhase("inhale");
            setTimer(0);
            return 0;
          }
          return prevTimer + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [phase]);

  const startExercise = () => {
    setPhase("inhale");
    setTimer(0);
  };

  const calculateCircle = () => {
    let size = 150;
    let color = "#90ee90"; // Default color for inhale

    if (phase === "hold") {
      size = 100; // Decrease size during hold
      color = "#ffcccb"; // Light pink for hold
    } else if (phase === "exhale") {
      size = 50; // Decrease size during exhale
      color = "#add8e6"; // Light blue for exhale
    }

    return {
      width: size,
      height: size,
      backgroundColor: color,
      transition: "width 1s, height 1s, background-color 1s",
    };
  };

  return (
    <Container className="breathing-exercise" maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom>
        Breathing Exercise
      </Typography>
      <Box className="breathing-container" sx={{ mt: 4 }}>
        <Box className="circle" style={calculateCircle()}></Box>
        <Typography variant="h6" component="div" className="timer" sx={{ mt: 2 }}>
          {timer}s
        </Typography>
      </Box>
      <Button variant="contained" color="primary" onClick={startExercise} sx={{ mt: 4 }}>
        Start Exercise
      </Button>
    </Container>
  );
};

export default BreathingExercise;
