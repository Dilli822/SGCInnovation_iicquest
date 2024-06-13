
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";

// const Appointment = () => {
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [appointments, setAppointments] = useState([]);
//   const [slotSaved, setSlotSaved] = useState(false);


//   const verifyAppointment = async (id) => {
//     try {
//       const response = await fetch(
//         `http://localhost:8000/sushtiti/account/users/appointments-to-doctor/${id}/`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//           body: JSON.stringify({
//             doctor_verify: true,
//           }),
//         }
//       );
  
//       if (response.ok) {
//         console.log("Appointment verified successfully");
//         fetchAppointments(); // Refresh the appointments list
//       } else {
//         console.error("Failed to verify appointment");
//       }
//     } catch (error) {
//       console.error("Error verifying appointment:", error);
//     }
//   };

  

//   useEffect(() => {
//     fetchDoctorSlottedFreeTime();
//     fetchAppointments();
//   }, []);

//   const fetchDoctorSlottedFreeTime = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:8000/sushtiti/account/doctor/free-time-slots/list/",
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         const formattedSlots = data.map((slot) => ({
//           id: slot.id,
//           start_time: new Date(slot.start_time).toLocaleString(),
//           end_time: new Date(slot.end_time).toLocaleString(),
//         }));
//         setAvailableSlots(formattedSlots);
//       } else {
//         console.error("Failed to fetch doctor's free time slots");
//       }
//     } catch (error) {
//       console.error("Error fetching doctor's free time slots:", error);
//     }
//   };

//   const fetchAppointments = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:8000/sushtiti/account/appointments-to-doctor/list/",
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         setAppointments(data);
//       } else {
//         console.error("Failed to fetch appointments");
//       }
//     } catch (error) {
//       console.error("Error fetching appointments:", error);
//     }
//   };

//   const handleAddSlot = async () => {
//     if (date && time) {
//       try {
//         const response = await fetch(
//           "http://localhost:8000/sushtiti/account/doctor/free-time-slots/create/",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//             },
//             body: JSON.stringify({
//               user: localStorage.getItem("userId"),
//               start_time: `${date}T${time}:00`,
//               end_time: `${date}T${time}:00`,
//             }),
//           }
//         );
//         if (response.ok) {
//           console.log("Slot saved successfully");
//           setSlotSaved(true); // Update state to indicate successful save
//           fetchDoctorSlottedFreeTime(); // Fetch updated doctor's free time slots
//         } else {
//           const responseData = await response.json();
//           console.error("Failed to save slot:", responseData);
//         }
//       } catch (error) {
//         console.error("Error saving slot:", error);
//       } finally {
//         setDate("");
//         setTime("");
//       }
//     }
//   };

//   const handleDeleteSlot = async (id) => {
//     try {
//       const response = await fetch(
//         `http://localhost:8000/sushtiti/account/doctor/free-time-slots/edit/${id}/`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         }
//       );

//       if (response.ok) {
//         console.log("Slot deleted successfully");
//         setAvailableSlots(availableSlots.filter((slot) => slot.id !== id));
//       } else {
//         console.error("Failed to delete slot");
//       }
//     } catch (error) {
//       console.error("Error deleting slot:", error);
//     }
//   };

//   return (
//     <Box sx={{ m: 4 }}>
//       <Typography variant="h4" component="h2" gutterBottom>
//         Manage Appointments
//       </Typography>

//       <Box sx={{ my: 4 }}>
//         <Typography variant="h5" component="h3" gutterBottom>
//           Add Available Slots
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={5}>
//             <TextField
//               label="Date"
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               fullWidth
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </Grid>
//           <Grid item xs={5}>
//             <TextField
//               label="Time"
//               type="time"
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//               fullWidth
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </Grid>
//           <Grid item xs={2}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleAddSlot}
//               fullWidth
//             >
//               Add
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>

//       <Box sx={{ my: 4 }}>
//         <Typography variant="h5" component="h3" gutterBottom>
//           Doctor's Free Time Slots
//         </Typography>

//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Start Time</TableCell>
//                 <TableCell>End Time</TableCell>
//                 <TableCell>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {availableSlots.map((slot) => (
//                 <TableRow key={slot.id}>
//                   <TableCell>{slot.start_time}</TableCell>
//                   <TableCell>{slot.end_time}</TableCell>
//                   <TableCell>
//                     <IconButton
//                       aria-label="delete"
//                       onClick={() => handleDeleteSlot(slot.id)}
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>

//       <Box sx={{ my: 4 }}>
//   <Typography variant="h5" component="h3" gutterBottom>
//     Appointments
//   </Typography>

//   <TableContainer component={Paper}>
//     <Table>
//       <TableHead>
//         <TableRow>
//           <TableCell>User ID</TableCell>
//           <TableCell>Booked DateTime</TableCell>
//           <TableCell>Free Time Slot ID</TableCell>
//           <TableCell>Doctor Verification</TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//       <Box sx={{ my: 4 }}>
//   <Typography variant="h5" component="h3" gutterBottom>
//     Appointments
//   </Typography>

//   <TableContainer component={Paper}>
//     <Table>
//       <TableHead>
//         <TableRow>
//           <TableCell>User ID</TableCell>
//           <TableCell>Booked DateTime</TableCell>
//           <TableCell>Free Time Slot ID</TableCell>
//           <TableCell>Doctor Verification</TableCell>
//           <TableCell>Action</TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {appointments.map((appointment) => (
//           <TableRow key={appointment.id}>
//             <TableCell>{appointment.user}</TableCell>
//             <TableCell>
//               {new Date(appointment.booked_datetime).toLocaleString()}
//             </TableCell>
//             <TableCell>{appointment.free_time_slot}</TableCell>
//             <TableCell>
//               {appointment.doctor_verify ? "Verified" : "Pending"}
//             </TableCell>
//             <TableCell>
//               {!appointment.doctor_verify && (
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={() => verifyAppointment(appointment.id)}
//                 >
//                   Verify
//                 </Button>
//               )}
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   </TableContainer>
// </Box>

//       </TableBody>
//     </Table>
//   </TableContainer>
// </Box>

//     </Box>
//   );
// };

// export default Appointment;



import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Appointment = () => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [slotSaved, setSlotSaved] = useState(false);

  const verifyAppointment = async (appointment) => {
    try {
      const response = await fetch(
        `http://localhost:8000/sushtiti/account/users/appointments-to-doctor/${appointment.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            ...appointment,
            doctor_verify: true,
          }),
        }
      );

      if (response.ok) {
        console.log("Appointment verified successfully");
        fetchAppointments(); // Refresh the appointments list
      } else {
        console.error("Failed to verify appointment");
      }
    } catch (error) {
      console.error("Error verifying appointment:", error);
    }
  };

  useEffect(() => {
    fetchDoctorSlottedFreeTime();
    fetchAppointments();
  }, []);

  const fetchDoctorSlottedFreeTime = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/sushtiti/account/doctor/free-time-slots/list/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const formattedSlots = data.map((slot) => ({
          id: slot.id,
          start_time: new Date(slot.start_time).toLocaleString(),
          end_time: new Date(slot.end_time).toLocaleString(),
        }));
        setAvailableSlots(formattedSlots);
      } else {
        console.error("Failed to fetch doctor's free time slots");
      }
    } catch (error) {
      console.error("Error fetching doctor's free time slots:", error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/sushtiti/account/appointments-to-doctor/list/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      } else {
        console.error("Failed to fetch appointments");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleAddSlot = async () => {
    if (date && time) {
      try {
        const response = await fetch(
          "http://localhost:8000/sushtiti/account/doctor/free-time-slots/create/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({
              user: localStorage.getItem("userId"),
              start_time: `${date}T${time}:00`,
              end_time: `${date}T${time}:00`,
            }),
          }
        );
        if (response.ok) {
          console.log("Slot saved successfully");
          setSlotSaved(true); // Update state to indicate successful save
          fetchDoctorSlottedFreeTime(); // Fetch updated doctor's free time slots
        } else {
          const responseData = await response.json();
          console.error("Failed to save slot:", responseData);
        }
      } catch (error) {
        console.error("Error saving slot:", error);
      } finally {
        setDate("");
        setTime("");
      }
    }
  };

  const handleDeleteSlot = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/sushtiti/account/doctor/free-time-slots/edit/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.ok) {
        console.log("Slot deleted successfully");
        setAvailableSlots(availableSlots.filter((slot) => slot.id !== id));
      } else {
        console.error("Failed to delete slot");
      }
    } catch (error) {
      console.error("Error deleting slot:", error);
    }
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
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom>
          Doctor's Free Time Slots
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {availableSlots.map((slot) => (
                <TableRow key={slot.id}>
                  <TableCell>{slot.start_time}</TableCell>
                  <TableCell>{slot.end_time}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteSlot(slot.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom>
          Appointments
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Booked DateTime</TableCell>
                <TableCell>Free Time Slot ID</TableCell>
                <TableCell>Doctor Verification</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.user}</TableCell>
                  <TableCell>
                    {new Date(appointment.booked_datetime).toLocaleString()}
                  </TableCell>
                  <TableCell>{appointment.free_time_slot}</TableCell>
                  <TableCell>
                    {appointment.doctor_verify ? "Verified" : "Pending"}
                  </TableCell>
                  <TableCell>
                    {!appointment.doctor_verify && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => verifyAppointment(appointment)}
                      >
                        Verify
                      </Button>
                    )}
                  </TableCell>
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
