import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";
import FreeTimeSlots from "./Free_Slot_Time";

const Appointment = () => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [patientAppointments, setPatientAppointments] = useState([]);
  const [slotSaved, setSlotSaved] = useState(false); // State to track if slot was saved successfully

  const handleAddSlot = async () => {
    if (date && time) {
      const newSlot = { id: uuidv4(), date, time };
      setAvailableSlots([...availableSlots, newSlot]);
      setDate("");
      setTime("");

      try {
        const response = await fetch(
          "http://localhost:8000/sushtiti/account/free-time-slots/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({
              start_time: `${date}T${time}:00`,
              end_time: `${date}T${time}:00`,
              doctor_or_teacher: localStorage.getItem("userId"),
            }),
          }
        );
        if (response.ok) {
          console.log("Slot saved successfully");
          setSlotSaved(true); // Update state to indicate successful save
          // Optionally, fetch updated patient appointments list here
        } else {
          const responseData = await response.json();
          console.error("Failed to save slot:", responseData);
        }
      } catch (error) {
        console.error("Error saving slot:", error);
      }
    }
  };

  const handleDeleteSlot = (id) => {
    setAvailableSlots(availableSlots.filter((slot) => slot.id !== id));
  };

  return (
    <Box sx={{ m: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Manage Appointments
      </Typography>

      <Box sx={{ my: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom>
          Add Available Slots
        </Typography>
        <Grid container spacing={2}>
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
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddSlot}
              fullWidth
            >
              Add
            </Button>
          </Grid>
        </Grid>

        <Grid>
<FreeTimeSlots/>
          
        </Grid>
        <List>
          {slotSaved &&
            availableSlots.map((slot) => (
              <ListItem key={slot.id}>
                <ListItemText primary={`${slot.date} ${slot.time}`} />
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
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom>
          Patient Appointments
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Date & Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patientAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.name}</TableCell>
                  <TableCell>{appointment.dob}</TableCell>
                  <TableCell>{appointment.address}</TableCell>
                  <TableCell>{appointment.contact}</TableCell>
                  <TableCell>{appointment.datetime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Appointment;
