import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Container } from "@material-ui/core";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";

// Sample Image URLs
const sampleImage = "https://via.placeholder.com/150";

// JSON data
const doctors = [
    {
      id: 1,
      name: "Dr. Alice Smith",
      address: "123 Itahari-6",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDY2SF57Qh-Dt1xdvW7XqrDG7ULlLYYsZK5g&s",
    },
    {
      id: 3,
      name: "Dr. Emily Johnson",
      address: "789 Itahari-6",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzT9ZoKT_GJEO_EM3Y4cJqvH3cjfvqyJ6EDw&s",
    },
    {
      id: 4,
      name: "Dr. Brown",
      address: "321 Itahari-7",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH89WK28TW5yiK7-YeRTVFp7Zo1CIGMLe1sQ&s",
    },
    {
      id: 5,
      name: "Dr. Linda Davis",
      address: "654 Itahari-4",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzZJfr8isw7BIVfzAM_7XRIx7qddbpGcUD0A&s",
    },
    {
      id: 6,
      name: "Dr. Robert Wilson",
      address: "987 itahari-9",
      image: "https://www.yourfreecareertest.com/wp-content/uploads/2018/01/how_to_become_a_doctor.jpg",
    },
    {
      id: 7,
      name: "Dr. Patricia Taylor",
      address: "159 Itahari-11",

    },
    {
      id: 8,
      name: "Dr. James Martinez",
      address: "753 Itahari-20",
      image: "https://i.pinimg.com/736x/dc/04/aa/dc04aaae4d9a84ad7c4a3be7bc4e9766.jpg",
    },
    {
      id: 9,
      name: "Dr. Barbara Anderson",
      address: "951 Itahari-9",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5XzsHpov1XRSZKMacf1_MUKB-u5br3HP3ug&s",
    },
    {
      id: 10,
      name: "Dr. William Thomas",
      address: "258 itahari-6",
      image: "https://www.yourfreecareertest.com/wp-content/uploads/2018/01/how_to_become_a_doctor.jpg",
    },
  ];
const DoctorsList = () => {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  return (
    <>
    <Container> 
    <Typography variant="h4">
              <>Doctors NearBy </>
    </Typography>
      <br />
      <Grid container spacing={2}>
        {doctors.slice(0, visibleCount).map((doctor) => (
          <Grid item xs={12} sm={6} md={2} lg={2} key={doctor.id}>
            <Card>
              <CardMedia
                component="img"
                width = "100%"
                height="200px"
                image={doctor.image}
                alt={doctor.name}
              />
              <CardContent>
                <Typography variant="body1">{doctor.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {doctor.address}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {visibleCount < doctors.length && (
        <Box textAlign="center" m={2}>
          <Button variant="contained" color="primary" onClick={handleViewMore}>
            View More
          </Button>
        </Box>
      )}
      </Container>
    </>
  );
};

export default DoctorsList;
