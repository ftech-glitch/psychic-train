import React, { useContext } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Typography, Container, Avatar, Grid, Button, FormControl, TextField } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import UserContext from "../context/user";
import { jwtDecode } from "jwt-decode";
import { useState } from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import useFetch from "../hooks/useFetch";

const UserProfile = (props) => {
    const fetchData = useFetch();
    const userCtx = useContext(UserContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const [profilePic, setProfilePic] = useState('');
    const [upload, setUpload] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);

            let reader = new FileReader();
            reader.onload = function () {
                setProfilePic(reader.result);
                console.log(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    const testHandleSubmit = async (event) => {
        event.preventDefault();

        const profileData = new FormData();
        profileData.append('image', profilePic);

        const profileRes = await fetchData("/auth/users/profile", "POST", profileData, userCtx.accessToken);
        // const profileRes = await fetch(import.meta.env.VITE_SERVER + "/auth/users/profile", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //         Authorization: "Bearer " + userCtx.accessToken,
        //     },
        //     body: profileData
        // })

        if (!profileRes.ok) {
            throw new Error('Network response was not ok');
        }

        // const responseData = await profileRes.json();
        console.log(JSON.stringify(profileRes));
        // console.log("profile photo uploaded!");
        // setProfilePic('');
        // setSelectedFile(null);
        // usernameRef.current.value = '';
        // passwordRef.current.value = '';
        // emailRef.current.value = '';
        // bioRef.current.value = '';
    };

    return (
        // <Box sx={{ position: "absolute", top: 0, bottom: 0, right: 0, background: "#78A083" }}>
        <Box sx={{ background: "#78A083" }}>
            <ThemeProvider theme={props.theme}>
                <CssBaseline />
                <Grid container spacing={4} component="main" maxWidth="xs" sx={{
                    marginTop: 8,
                    marginBottom: 8,
                    gridAutoRows: "repeat(2, 1fr)",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    {/* Profile Photo */}
                    <Grid item xs={12} sx={{ display: "grid", justifyContent: "center", alignItems: "center", marginBottom: 5 }}>
                        <Avatar sx={{ bgcolor: 'white', width: 100, height: 100 }}>
                            <img src="https://i.pravatar.cc/200"></img>
                        </Avatar>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }} onClick={() => {
                                setUpload(true);
                            }}
                        >
                            Upload Profile Pic
                        </Button>

                        {upload && (
                            <Box component="form" noValidate sx={{ mt: 3 }}>
                                <Grid item xs={12}>
                                    <FormControl>
                                        <TextField
                                            value={selectedFile ? selectedFile.name : ''}
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
                                        <Button variant="contained" color="primary" startIcon={<FileUploadIcon />} onClick={testHandleSubmit}>
                                            Upload
                                        </Button>
                                    </FormControl>
                                </Grid>
                            </Box>

                        )}
                    </Grid>

                    {/* Username, Email, and Gender */}
                    <Grid item xs={12} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <Typography variant="h3">{`${userCtx.userProfile.username}`}</Typography>
                        <Typography variant="h6">{`${userCtx.userProfile.email}`}</Typography>
                        <Typography variant="h6">{`${userCtx.userProfile.gender}`}</Typography>
                    </Grid>

                    {/* Bio */}
                    {userCtx.userProfile.bio && (
                        <Grid item xs={12} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <Typography variant="h4">About me</Typography>
                            <Typography variant="h5">{`${userCtx.userProfile.bio}`}</Typography>
                        </Grid>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }} onClick={() => {
                            userCtx.setUserProfile({});
                            userCtx.setAccessToken("");
                            props.setShowLogin(true);
                        }}
                    >
                        Logout
                    </Button>
                </Grid>

            </ThemeProvider>
        </Box >
    );
};

export default UserProfile;

