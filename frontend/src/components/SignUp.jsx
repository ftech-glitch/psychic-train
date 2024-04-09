// import * as React from 'react';
import React, { useEffect, useRef, useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { jwtDecode } from "jwt-decode";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            <Link color="inherit" href="https://github.com/ftech-glitch/psychic-train">
                Github Link Here!
            </Link>{' '}
        </Typography>
    );
}


const defaultTheme = createTheme();

const SignUp = (props) => {
    const userCtx = useContext(UserContext);
    const fetchData = useFetch();
    const usernameRef = useRef('');
    const passwordRef = useRef('');
    const emailRef = useRef('');
    const bioRef = useRef('');
    // const [profilePic, setProfilePic] = useState('');
    const [gender, setGender] = useState('');
    // const [selectedFile, setSelectedFile] = useState(null);

    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         setSelectedFile(file);

    //         let reader = new FileReader();
    //         reader.onload = function () {
    //             setProfilePic(reader.result);
    //             console.log(profilePic)
    //         };
    //         // reader.readAsText(file);
    //         reader.readAsDataURL(file);
    //         // reader.readAsArrayBuffer(file);
    //     }
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!usernameRef.current.value || !passwordRef.current.value || !emailRef.current.value || !gender) {
            alert('Please fill out all required fields.');
            return;
        }

        // Use JSON - Profile pic upload not working
        const outgoingData = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            email: emailRef.current.value,
            gender: gender,
            profile: profilePic
        };

        if (bioRef.current.value) {
            outgoingData.bio = bioRef.current.value;
        }

        // Use FormData
        // const outgoingData = new FormData();

        // outgoingData.append('username', usernameRef.current.value);
        // outgoingData.append('password', passwordRef.current.value);
        // outgoingData.append('email', emailRef.current.value);
        // outgoingData.append('gender', gender);

        // if (profilePic) {
        //     outgoingData.append('profile', profilePic);
        // }

        // if (bioRef.current.value) {
        //     outgoingData.append('bio', bioRef.current.value);
        // }


        // const res = await fetch("/auth/register", outgoingData, {
        //     header: {
        //         "Content-Type": "multipart/form-data",
        //     },
        //     method: "PUT",
        // });

        const res = await fetchData("/auth/register", "PUT", outgoingData);

        if (!res.ok) {
            alert(`Register failed!: ${res.json()}`);
        } else {
            usernameRef.current.value = '';
            passwordRef.current.value = '';
            emailRef.current.value = '';
            bioRef.current.value = '';
            setProfilePic('');
            setSelectedFile(null);
        }
    };

    const testHandleSubmit = async (event) => {
        event.preventDefault();

        if (!usernameRef.current.value || !passwordRef.current.value) {
            alert('Please fill out all required fields.');
            return;
        }

        const completeProfile = {};

        const resLogin = await fetchData("/auth/login", "POST", { username: usernameRef.current.value, password: passwordRef.current.value });

        if (resLogin.ok) {
            userCtx.setAccessToken(resLogin.data.access);
            const decoded = jwtDecode(resLogin.data.access);
            userCtx.setRole(decoded.role);

            const profile = await fetchData("/auth/users/profile", "GET", undefined, resLogin.data.access);

            if (profile.ok) {
                completeProfile.username = profile.data.userInfo.userNAME;
                completeProfile.email = profile.data.userInfo.userEMAIL;
                completeProfile.gender = profile.data.userInfo.userGENDER;
                completeProfile.bio = profile.data.userProfile.bio ? profile.data.userProfile.bio : "";

                userCtx.setUserProfile(completeProfile);
            } else {
                throw new Error(JSON.stringify(profile.data))
            }
        } else {
            throw new Error(JSON.stringify(resLogin.data))
        }

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

        const responseData = await profileRes.json();
        console.log(responseData);
        // console.log("profile photo uploaded!");
        // setProfilePic('');
        // setSelectedFile(null);
        // usernameRef.current.value = '';
        // passwordRef.current.value = '';
        // emailRef.current.value = '';
        // bioRef.current.value = '';
    };


    return (
        <>
            <ThemeProvider theme={props.theme}>
                <CssBaseline />
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        inputRef={usernameRef}
                                        autoComplete="username"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        inputRef={emailRef}
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        inputRef={passwordRef}
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        name="bio"
                                        label="Optional: Write a short intro about yourself :)"
                                        type="bio"
                                        id="bio"
                                        inputRef={bioRef}
                                        autoComplete="new-password"></TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label" sx={{ textAlign: 'start' }}>Gender</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            onChange={(e) => { setGender(e.target.value === "" ? "" : e.target.value) }}
                                        >
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="non-binary" control={<Radio />} label="Non-binary" />
                                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                                        </RadioGroup>
                                        {/* <TextField
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
                                        /> */}
                                        {/* <Button variant="contained" color="primary" startIcon={<FileUploadIcon />} onClick={handleFileUpload}>
                                            Upload
                                        </Button> */}
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link onClick={() => {
                                        props.setShowLogin(true);
                                    }} variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />

                </Container>
            </ThemeProvider >
            {/* <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                
            </Grid> */}

        </>

    );
}

export default SignUp;