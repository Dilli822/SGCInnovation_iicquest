import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Card,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Modal,
} from "@mui/material";
import Header from "../../header/header";

const DoctorProfileUpdate = () => {
  const [profileData, setProfileData] = useState({});
  const [profileEditMode, setProfileEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [initialProfileData, setInitialProfileData] = useState({});
  const [open, setOpen] = useState(false);
  const [doctorId, setDoctorId] = useState(0);

  useEffect(() => {
    fetchDoctorData();
    fetchProfileData();
  }, []);

  const fetchDoctorData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/sushtiti/account/doctors/self",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          const doctorId = data[0].doctor_id; // Assuming there's only one doctor returned
          setDoctorId(doctorId); // Set doctor_id in state
          localStorage.setItem("doctorId", doctorId); // Store doctor_id in localStorage
        }
      } else {
        console.error("Failed to fetch doctor data");
      }
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
  };

  const fetchProfileData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/sushtiti/account/doctors/${doctorId}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
        setInitialProfileData(data);
      } else {
        console.error("Failed to fetch profile data");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const handleLogout = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogoutConfirm = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleEditProfile = () => {
    setProfileEditMode(true);
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      if (imageFile) {
        formData.append("image", imageFile);
      }
      formData.append("address", profileData.address);
      formData.append("phone_number", profileData.phone_number);
      formData.append("bio", profileData.bio);

      const doctorId = localStorage.getItem("doctorId");

      const response = await fetch(
        `http://localhost:8000/sushtiti/account/doctors/edit/${doctorId}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: formData,
        }
      );
      if (response.ok) {
        setProfileEditMode(false);
        // Optionally, fetch updated profile data after save if needed
        fetchProfileData();
      } else {
        console.error("Failed to update profile data");
      }
    } catch (error) {
      console.error("Error updating profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setProfileData(initialProfileData);
    setProfileEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);

    // Update the image preview immediately
    const reader = new FileReader();
    reader.onload = (e) => {
      setProfileData((prevData) => ({
        ...prevData,
        image: e.target.result,
      }));
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <Container>
        <Card
          style={{
            padding: "24px",
            maxWidth: "600px",
            margin: "24px auto",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h5">Doctor Profile</Typography>

          <Box display="flex" flexDirection="column">
            <Box
              display="flex"
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                overflow: "hidden",
                position: "relative",
                marginBottom: "16px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                key={profileData.image}
                src={
                  imageFile
                    ? URL.createObjectURL(imageFile)
                    : `${profileData.image}`
                }
                alt="Profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {profileEditMode && (
                <TextField
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{
                    position: "absolute",
                    bottom: "8px",
                    right: "8px",
                    zIndex: 1,
                    opacity: 0,
                    cursor: "pointer",
                  }}
                />
              )}
            </Box>

            <Typography variant="h5" style={{ marginBottom: "8px" }}>
              {profileData.buyerName}
            </Typography>
            <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
              {profileData.buyerEmail}
            </Typography>
            <Typography variant="body1" style={{ marginBottom: "16px" }}>
              ID: #{profileData.doctor_id}
            </Typography>

            <Typography variant="body1" style={{ marginBottom: "16px" }}>
              Address:{" "}
              {profileEditMode ? (
                <TextField
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  style={{ width: "100%" }}
                />
              ) : (
                profileData.address
              )}
            </Typography>

            <Typography variant="body1" style={{ marginBottom: "16px" }}>
              Phone Number:{" "}
              {profileEditMode ? (
                <TextField
                  name="phone_number"
                  value={profileData.phone_number}
                  onChange={handleInputChange}
                  style={{ width: "100%" }}
                />
              ) : (
                profileData.phone_number
              )}
            </Typography>

            <Typography
              variant="body1"
              style={{ marginBottom: "16px", textAlign: "left" }}
            >
              Bio:{" "}
              {profileEditMode ? (
                <TextField
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  style={{ width: "100%" }}
                />
              ) : (
                profileData.bio
              )}
            </Typography>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "16px",
                width: "100%",
              }}
            >
              {profileEditMode ? (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveProfile}
                    disabled={loading}
                    style={{ marginRight: "8px" }}
                  >
                    {loading ? <CircularProgress size={24} /> : "Save"}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleCancelEdit}
                    style={{ marginLeft: "8px" }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEditProfile}
                    style={{ marginRight: "8px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleLogout}
                    style={{ marginLeft: "8px" }}
                  >
                    Logout
                  </Button>
                </>
              )}
            </div>
          </Box>
        </Card>

        <Modal open={open} onClose={handleClose}>
          <Box
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "300px",
              backgroundColor: "#ffffff",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0)",
              padding: "24px",
              outline: "none",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Are you sure you want to logout?
            </Typography>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "24px",
              }}
            >
              <Button
                variant="contained"
                onClick={handleClose}
                style={{ marginRight: "16px" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogoutConfirm}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Modal>
      </Container>
    </>
  );
};

export default DoctorProfileUpdate;
