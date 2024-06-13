import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const FreeTimeSlots = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetchTimeSlots();
  }, []);

  const fetchTimeSlots = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/sushtiti/account/free-time-slots/"
      );
      setTimeSlots(response.data);
    } catch (error) {
      console.error("Error fetching time slots:", error);
    }
  };

  const handleDeleteSlot = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/sushtiti/account/free-time-slots/${id}/`
      );
      if (response.status === 204) {
        setSnackbarMessage("Time slot deleted successfully");
        setSnackbarOpen(true);
        // Update the UI by removing the deleted slot from state
        setTimeSlots(timeSlots.filter((slot) => slot.id !== id));
      } else {
        setSnackbarMessage("Failed to delete time slot");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error deleting time slot:", error);
      setSnackbarMessage("Failed to delete time slot");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ m: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Available Free Time Slots
      </Typography>

      <List>
        {timeSlots.map((slot) => (
          <ListItem key={slot.id}>
            <ListItemText
              primary={`${new Date(slot.start_time).toLocaleString()} - ${new Date(
                slot.end_time
              ).toLocaleString()}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteSlot(slot.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default FreeTimeSlots;
