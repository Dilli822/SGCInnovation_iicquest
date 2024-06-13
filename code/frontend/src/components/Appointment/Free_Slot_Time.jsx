import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
} from "@mui/material";
import { DateTimePicker } from "@mui/lab";

const FreeTimeSlots = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [displayCount, setDisplayCount] = useState(5);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [appointmentStartTime, setAppointmentStartTime] = useState(null);
  const [appointmentEndTime, setAppointmentEndTime] = useState(null);
  const [date, setDate] = useState(""); // State for selected date
  const [time, setTime] = useState(""); // State for selected time

  useEffect(() => {
    fetchTimeSlots();
  }, []);

  const fetchTimeSlots = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/sushtiti/account/doctor/free-time-slots/list/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch time slots");
      }

      const data = await response.json();
      setTimeSlots(data);
    } catch (error) {
      console.error("Error fetching time slots:", error);
    }
  };

  const handlePlaceAppointment = (slot) => {
    setSelectedSlot(slot);
    setAppointmentStartTime(new Date(slot.start_time));
    setAppointmentEndTime(new Date(slot.end_time));
    setConfirmationOpen(true);
  };

  const confirmAppointmentPlacement = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const doctorOrTeacherId = selectedSlot.doctor_or_teacher;

      // Fetch existing appointments for the user
      const existingAppointments = await fetchAppointments();

      // Check if user already has an appointment on the same day
      const selectedDate = new Date(
        selectedSlot.start_time
      ).toLocaleDateString();
      const hasExistingAppointment = existingAppointments.some(
        (appointment) => {
          const appointmentDate = new Date(
            appointment.start_time
          ).toLocaleDateString();
          return (
            appointment.user === parseInt(userId) &&
            appointmentDate === selectedDate
          );
        }
      );

      if (hasExistingAppointment) {
        throw new Error(
          "Cannot place appointment. You already have an appointment on the same day."
        );
      }

      // Proceed to place appointment if no conflict
      const responsePlacement = await fetch(
        "http://localhost:8000/sushtiti/account/users/appointments-to-doctor/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            time_slot_id: selectedSlot.id,
            free_time_slot: selectedSlot.id,
            user: parseInt(userId),
            doctor: localStorage.getItem("userId"),
            start_time: appointmentStartTime.toISOString(),
            end_time: appointmentEndTime.toISOString(),
            date, // Include selected date
            time, // Include selected time
          }),
        }
      );

      if (!responsePlacement.ok) {
        throw new Error("Failed to place appointment");
      }

      setSnackbarMessage("Appointment placed successfully");
      setSnackbarOpen(true);
      setConfirmationOpen(false);
      fetchTimeSlots(); // Refresh time slots after placing appointment
    } catch (error) {
      console.error("Error placing appointment:", error);
      // Display error message to user, e.g., using Snackbar or any other UI component
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/sushtiti/account/users/appointments-to-doctor/list/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch existing appointments");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching existing appointments:", error);
      throw new Error("Failed to fetch existing appointments");
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
    setSelectedSlot(null);
    setAppointmentStartTime(null);
    setAppointmentEndTime(null);
    setDate(""); // Reset selected date
    setTime(""); // Reset selected time
  };

  const handleViewMore = () => {
    setDisplayCount((prevCount) => prevCount + 5);
  };

  return (
    <Box sx={{ m: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Available Free Time Slots
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timeSlots.slice(0, displayCount).map((slot) => (
              <TableRow key={slot.id}>
                <TableCell>
                  {new Date(slot.start_time).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(slot.start_time).toLocaleTimeString()}
                </TableCell>
                <TableCell>
                  {new Date(slot.end_time).toLocaleTimeString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handlePlaceAppointment(slot)}
                  >
                    Place Appointment
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {displayCount < timeSlots.length && (
        <Box textAlign="center" mt={2}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleViewMore}
          >
            View More
          </Button>
        </Box>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />

      <Dialog open={confirmationOpen} onClose={handleCloseConfirmation}>
        <DialogTitle>Confirm Appointment</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to place an appointment from{" "}
            {appointmentStartTime
              ? `${appointmentStartTime.toLocaleDateString()} ${appointmentStartTime.toLocaleTimeString()}`
              : ""}{" "}
            to{" "}
            {appointmentEndTime
              ? `${appointmentEndTime.toLocaleTimeString()}`
              : ""}
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={5}>
              <TextField
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                label="Time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation}>Cancel</Button>
          <Button
            onClick={confirmAppointmentPlacement}
            variant="contained"
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FreeTimeSlots;
