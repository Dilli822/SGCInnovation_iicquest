import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const quotes = [
  "Practice mindfulness daily for inner peace and clarity.🔆",
  "Connect with loved ones for support and companionship.🍀",
  "Engage in regular physical activity for mental well-being.🏃‍♂️",
  "Prioritize sufficient sleep for cognitive function and emotional balance.✨💚",
  "Limit screen time to reduce stress and improve sleep quality.💤",
  // Add more quotes as needed
];

const TipsCards = () => {
  const [open, setOpen] = useState(true);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  const handleExited = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    setOpen(true);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Snackbar
      open={open}
      autoHideDuration={null} // null to keep open until user clicks close
      onClose={handleClose}
      onExited={handleExited}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      style={{ position: "fixed", bottom: "24px", right: "0" }}
    >
      <SnackbarContent
        style={{
          border: "0px solid #4FC3F7",
          backgroundColor: "#fff",
          color: "#000",
          maxWidth: "400px",
        }}
        message={
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "auto",fontWeight: "450", letterSpacing: "1px" }}>
              {quotes[currentQuoteIndex]}
            </span>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
              style={{ marginLeft: "0px", color: "black",  }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        }
      />
    </Snackbar>
  );
};

export default TipsCards;
