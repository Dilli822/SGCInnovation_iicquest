import React from "react";
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Link, 
  Button,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Emergency from "../Emergency/Emergency";
import Widget from "../Widget/Widget";
import Projects from "../Project/Projects";
import Join from "../Join/Join"
import DoctorsList from "../nearby/doctorsNearby";
export default function LandingPage() {
  return (
    <>
      {/* <Emergency /> */}
      {/* <Carousel/> */}

      <Grid container></Grid>

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{
          backgroundImage: `url("https://raw.githubusercontent.com/aakashstha1/Susthiti/main/Frame%2013.jpg")`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "60vh", // Adjust height as needed
        }}
      >
        <Grid container>
          <Grid item md={1}></Grid>

          <Grid item md={6}>
            <Typography variant="h3">Stronger Minds, Together</Typography>
            <br />

            <Typography align="left" variant="body1">
              Join our community of like-minded individuals committed to
              personal growth and collective well-being. Together, we explore
              the depths of human potential and support each other on the
              journey to becoming the best versions of ourselves.
            </Typography>
          </Grid>
        </Grid>

        {/* Add content inside the Grid if needed */}
      </Grid>
      <br />
      <br />
      <br />
      <br />
      <Widget />

      <br />
      <br />
      <br />


      <Join/>

      <br />
      <DoctorsList/>

      <br />
      <br />
      <br />
    
    
      <Box color="white" p={4}>
      <hr />
        <br />
        <br />
     
        <Grid container>
        <Grid item md={11}>
        <Typography variant="h3" align="left" mb={2} sx={{ color: "#000" }}>
          Frequently Asked Questions
        </Typography>
        <Typography align="left" sx={{ color: "#000", fontSize: "18px" }}>
          Curiosity is an important part of taking care of ourselves and those
          we care about.
          </Typography>
          {/* "#4FC3F7",  */}
        <Typography align="left" sx={{ color: "#000", fontSize: "18px" }}>
 Asking
           questions and staying informed helps protect and
          improve our emotional health.
        </Typography>
          </Grid>
          </Grid>
        <br />
        <hr />
        <br />
        <br />

        
  
        <Box>

          
          <Accordion sx={{ backgroundColor: "#fff", color: "black", mb: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6">
                What exactly is “mental health”?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Mental health refers to cognitive, behavioral, and emotional
                well-being. It is all about how people think, feel, and behave.
                Mental health is important at every stage of life, from
                childhood and adolescence through adulthood.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ backgroundColor: "#fff", color: "black", mb: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography variant="h6">
                What’s the difference between day-to-day emotional struggles and
                mental health conditions?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Day-to-day emotional struggles are normal responses to life’s
                challenges and stressors. However, mental health conditions
                involve persistent symptoms that affect a person’s thoughts,
                feelings, or behaviors and cause significant distress or
                impairment in daily functioning.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ backgroundColor: "#fff", color: "black", mb: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography variant="h6">
                What happens when mental health issues aren’t addressed?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Untreated mental health issues can worsen over time and lead to
                difficulties in relationships, work, school, and overall quality
                of life. It’s important to seek help and support early to
                prevent these negative outcomes.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ backgroundColor: "#fff", color: "black", mb: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4a-content"
              id="panel4a-header"
            >
              <Typography variant="h6">
                What are mental health professionals for?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Mental health professionals, such as psychologists,
                psychiatrists, counselors, and therapists, are trained to
                assess, diagnose, and treat various mental health conditions.
                They provide therapy, medication management, and support to
                individuals experiencing mental health challenges.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ backgroundColor: "#fff", color: "black", mb: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel5a-content"
              id="panel5a-header"
            >
              <Typography variant="h6">
                How can we improve and protect our mental health?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                There are several ways to improve and protect mental health,
                including practicing self-care, maintaining social connections,
                staying physically active, managing stress effectively, getting
                enough sleep, and seeking professional help when needed.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ backgroundColor: "#fff", color: "black", mb: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel6a-content"
              id="panel6a-header"
            >
              <Typography variant="h6">
                What if I’m overwhelmed and don’t know where to start?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                If you’re feeling overwhelmed, it’s important to reach out for
                support. Talk to a trusted friend, family member, or mental
                health professional who can provide guidance and help you
                navigate your feelings and options for support.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>



    </>
  );
}
