import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Button,
  FormControl,
  TextField,
  CssBaseline,
  IconButton,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CancelIcon from "@mui/icons-material/Cancel";
import UserContext from "../context/user";
import Copyright from "./Copyright";
import SnackbarMessage from "./SnackbarMessage";

const UserProfile = (props) => {
  const userCtx = useContext(UserContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePic, setProfilePic] = useState("");
  const [upload, setUpload] = useState(false);

  const demuxProfileString = (imgString) => {
    const parsed = imgString;
    return `data:${parsed.mimetype};base64,${parsed.base64}`;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const profileData = new FormData();
    profileData.append("image", selectedFile);

    const profileRes = await fetch(
      import.meta.env.VITE_SERVER + "/auth/users/profile",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + userCtx.accessToken,
        },
        body: profileData,
      }
    );

    if (!profileRes.ok) {
      throw new Error("Network response was not ok");
    } else {
      // Reflect profile pic changes immediately after DB fetch
      const resMsg = await profileRes.json();
      const resImg = resMsg.imgChanged;
      userCtx.setUserProfile({
        ...userCtx.userProfile,
        profile: demuxProfileString(resImg),
      });
      props.snackbarOperations.setSnackbarMessage("Profile pic changed!");
      props.snackbarOperations.setSnackbarOpen(true);
      setSelectedFile(null);
      setUpload(false);
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();

    setUpload(false);
  };

  return (
    // <Box sx={{ position: "absolute", top: 0, bottom: 0, right: 0, background: "#78A083" }}>
    <Box sx={{ background: "#78A083" }}>
      <ThemeProvider theme={props.theme}>
        <CssBaseline />
        <SnackbarMessage
          open={props.snackbarOperations.snackbarOpen}
          message={props.snackbarOperations.snackbarMessage}
          vertical="top"
          horizontal="right"
          setSnackbarOpen={props.snackbarOperations.setSnackbarOpen}
          setSnackbarMessage={props.snackbarOperations.setSnackbarMessage}
        ></SnackbarMessage>
        <Grid
          container
          component="main"
          sx={{ justifyContent: "center", alignItems: "center", padding: 5 }}
        >
          <Grid item xs={12} sx={{ textAlign: "center", marginBottom: 0 }}>
            <Avatar
              sx={{
                bgcolor: "orange",
                width: 200,
                height: 200,
                margin: "auto",
              }}
              src={userCtx.userProfile.profile}
              alt="Profile"
            />
            {!upload && (
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  setUpload(true);
                }}
              >
                Change Profile Pic
              </Button>
            )}

            {upload && (
              <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid item xs={12}>
                  <FormControl>
                    <TextField
                      value={selectedFile ? selectedFile.name : ""}
                      label="Upload Profile Picture"
                      InputProps={{
                        readOnly: true,
                        startAdornment: (
                          <IconButton component="label">
                            <AttachFileIcon />
                            <input
                              type="file"
                              hidden
                              onChange={handleFileChange}
                            />
                          </IconButton>
                        ),
                      }}
                    />
                    <Grid container gap={2} sx={{ margin: "1rem" }}>
                      <Button
                        xs={6}
                        variant="contained"
                        color="primary"
                        startIcon={<FileUploadIcon />}
                        onClick={handleSubmit}
                      >
                        Upload
                      </Button>
                      <Button
                        xs={6}
                        variant="contained"
                        color="error"
                        startIcon={<CancelIcon />}
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </FormControl>
                </Grid>
              </Box>
            )}
          </Grid>

          {/* Username, Email, and Gender */}
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h3">{`${userCtx.userProfile.username}`}</Typography>
            <Typography variant="h6">{`${userCtx.userProfile.email}`}</Typography>
            <Typography variant="h6">{`${userCtx.userProfile.gender}`}</Typography>
          </Grid>

          {/* Bio */}
          {userCtx.userProfile.bio && (
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h4">About me</Typography>
              <Typography variant="h5">{`${userCtx.userProfile.bio}`}</Typography>
            </Grid>
          )}
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              userCtx.setUserProfile({});
              userCtx.setAccessToken("");
              props.setShowLogin(true);
            }}
          >
            Logout
          </Button>
        </Grid>

        <Copyright theme={props.theme} />
      </ThemeProvider>
    </Box>
  );
};

export default UserProfile;
