import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DoctorProfileUpdate from "../Doctor/updateDoctor";
import Appointment from "../../Appointment/Appointment";
import AppHeader from "../../header/header";
import { Grid } from "@mui/material";
import AnyUserProfileUpdate from "./updateAnonyUser";
import FreeTimeSlots from "../../Appointment/Free_Slot_Time";
import AppointmentPlacementsList from "../../Appointment/appoint_placed";

const AnnoyUser = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check user role based on localStorage

    if (
      localStorage.getItem("is_doctor") !== "true" &&
      localStorage.getItem("is_mediatationTeacher") == true &&
      localStorage.getItem("is_annoymousUser") != true
    ) {
      // Optional: Navigate to the doctor profile page if needed
      navigate("/profile/mediator-teacher");
    }

    if (
      localStorage.getItem("is_doctor") !== "true" &&
      localStorage.getItem("is_mediatationTeacher") !== true &&
      localStorage.getItem("is_annoymousUser") == true
    ) {
      // Optional: Navigate to the doctor profile page if needed
      navigate("/profile/user/");
    }

    if (
      localStorage.getItem("is_doctor") === "true" &&
      localStorage.getItem("is_mediatationTeacher") !== true &&
      localStorage.getItem("is_annoymousUser") !== true
    ) {
      // Optional: Navigate to the doctor profile page if needed
      navigate("/profile/doctor/");
    }
  }, [navigate]);

  return (
    <>
    <AppHeader/>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <AnyUserProfileUpdate />
        </Grid>
        <Grid item md={6}>
          <FreeTimeSlots />
        </Grid>
      </Grid>

      <Grid item md={12}>
        <AppointmentPlacementsList />
      </Grid>
    </>
  );
};

export default AnnoyUser;
