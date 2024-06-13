import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DoctorProfileUpdate from "./updateDoctor";
import Appointment from "../Appointment/Appointment";

import {
  Grid,
} from "@mui/material";
import AnyUserProfileUpdate from "./updateAnonyUser";

const AnnoyUser = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check user role based on localStorage
    
    if (localStorage.getItem("is_doctor") !== "true" && localStorage.getItem("is_mediatationTeacher") == true && localStorage.getItem("is_annoymousUser") != true) {
      // Optional: Navigate to the doctor profile page if needed
      navigate("/profile/mediator-teacher");
    }

    if (localStorage.getItem("is_doctor") !== "true" && localStorage.getItem("is_mediatationTeacher") !== true && localStorage.getItem("is_annoymousUser") == true) {
      // Optional: Navigate to the doctor profile page if needed
      navigate("/profile/user/");
    }


     if (localStorage.getItem("is_doctor") === "true" && localStorage.getItem("is_mediatationTeacher") !== true && localStorage.getItem("is_annoymousUser") !== true) {
      // Optional: Navigate to the doctor profile page if needed
      navigate("/profile/doctor/");
    }
  }, [navigate]);

  return (
    <Grid container spacing={3}>
      <Grid item md={6}>
        <AnyUserProfileUpdate />
      </Grid>
      <Grid item md={6}>
        {/* <Appointment /> */}
      </Grid>
    </Grid>
  );
};

export default AnnoyUser;
