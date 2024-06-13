import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Avatar,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import HelpIcon from "@mui/icons-material/Help";

const doctors = [
  {
    id: 1,
    name: "Dr. John Doe",
    specialty: "Cardiologist",
    profilePic: "https://example.com/doctor1.jpg",
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    specialty: "Orthopedist",
    profilePic: "https://example.com/doctor2.jpg",
  },
  {
    id: 3,
    name: "Dr. Emily Johnson",
    specialty: "Dermatologist",
    profilePic: "https://example.com/doctor3.jpg",
  },
  {
    id: 4,
    name: "Dr. Michael Brown",
    specialty: "Pediatrician",
    profilePic: "https://example.com/doctor4.jpg",
  },
  {
    id: 5,
    name: "Dr. Sarah Wilson",
    specialty: "Neurologist",
    profilePic: "https://example.com/doctor5.jpg",
  },
];

const EmergencySupport = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewMore = () => {
    alert("Viewing more doctors...");
    // Implement the actual logic to view more doctors, e.g., navigating to another page
  };

  return (
    <Card sx={{ margin: 2 }}>
      <CardContent>

        <Grid container>
          <Grid item md={6}>
<HelpIcon color="error" fontSize="large" />
          <Typography variant="h6" ml={2}>
            Emergency Support
          </Typography>

        <Typography variant="body1" mb={2}>
          If you need immediate assistance, please use one of the following
          options to contact our support team.
        </Typography>
          </Grid>

          <Grid item md={6}>
          <Button
              variant="contained"
              color="error"
              startIcon={<PhoneIcon />}
              fullWidth
              onClick={handleClickOpen}
            >
              Call Us
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<EmailIcon />}
              fullWidth
              onClick={handleClickOpen}
            >
              Email Us
            </Button>
</Grid>

        </Grid>

          
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={2}>
           
          </Grid>
        </Grid>

        <Box mt={4}>
          <Typography variant="h6" mb={2}>
            Nearby Doctors
          </Typography>
          <Grid container spacing={2}>
            {doctors.map((doctor) => (
              <Grid item xs={12} sm={6} md={2.4} key={doctor.id}>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar
                        alt={doctor.name}
                        src={doctor.profilePic}
                        sx={{ width: 56, height: 56, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="h6">{doctor.name}</Typography>
                        <Typography color="textSecondary">
                          {doctor.specialty}
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => alert(`Contacting ${doctor.name}`)}
                    >
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box mt={2} display="flex" justifyContent="center">
            <Button variant="default" color="primary" onClick={handleViewMore}>
              View More
            </Button>
          </Box>
        </Box>
      </CardContent>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Contact Emergency Support</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select your preferred method of contact and we will assist you as
            soon as possible.
          </DialogContentText>
          <Box display="flex" justifyContent="space-around" mt={2}>
            <IconButton
              color="error"
              onClick={() => (window.location.href = "tel:+123456789")}
            >
              <PhoneIcon fontSize="large" />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() =>
                (window.location.href = "mailto:support@example.com")
              }
            >
              <EmailIcon fontSize="large" />
            </IconButton>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default EmergencySupport;
