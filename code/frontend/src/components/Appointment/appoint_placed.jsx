import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Snackbar,
  Alert,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";

const AppointmentPlacementsTable = () => {
  const [appointmentPlacements, setAppointmentPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayCount, setDisplayCount] = useState(5); // State to manage number of displayed appointments
  const [confirmationOpen, setConfirmationOpen] = useState(false); // State for confirmation dialog
  const [appointmentIdToDelete, setAppointmentIdToDelete] = useState(null); // State to store appointment ID to delete
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchAppointmentPlacements = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await fetch(
          "http://localhost:8000/sushtiti/account/appointment-placements/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setAppointmentPlacements(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAppointmentPlacements();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleCancelAppointment = (appointmentId) => {
    // Open confirmation dialog and set the appointment ID to delete
    setConfirmationOpen(true);
    setAppointmentIdToDelete(appointmentId);
  };

  const handleConfirmDelete = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch(
        `http://localhost:8000/sushtiti/account/appointment-placements/${appointmentIdToDelete}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel appointment");
      }

      // Remove the deleted appointment from the state
      setAppointmentPlacements((prevAppointments) =>
        prevAppointments.filter(
          (appointment) => appointment.id !== appointmentIdToDelete
        )
      );

      // Close confirmation dialog after successful deletion
      setConfirmationOpen(false);

      // Show success snackbar
      setSnackbarSeverity("success");
      setSnackbarMessage("Appointment cancelled successfully");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      // Handle error state or display an error message

      // Show error snackbar
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to cancel appointment");
      setSnackbarOpen(true);
    }
  };

  const handleCancelDelete = () => {
    // Close confirmation dialog without deleting
    setConfirmationOpen(false);
    setAppointmentIdToDelete(null);
  };

  const handleViewMore = () => {
    setDisplayCount((prevCount) => prevCount + 5);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Doctor or Teacher</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointmentPlacements.slice(0, displayCount).map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.user}</TableCell>
                <TableCell>{appointment.doctor_or_teacher}</TableCell>
                <TableCell>{appointment.start_time}</TableCell>
                <TableCell>{appointment.end_time}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Cancel />}
                    onClick={() => handleCancelAppointment(appointment.id)}
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {displayCount < appointmentPlacements.length && (
        <Container align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleViewMore}
          >
            View More
          </Button>
        </Container>
      )}
      {/* Confirmation Dialog */}
      <Dialog open={confirmationOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel this appointment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* Snackbar for success/error message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
    </Container>
  );
};

export default AppointmentPlacementsTable;
