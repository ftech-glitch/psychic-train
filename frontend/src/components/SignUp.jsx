// import * as React from 'react';
import React, { useRef, useState, useContext } from 'react';
import { Button, CssBaseline, TextField, FormControl, FormLabel, FormControlLabel, Link, Grid, Box, Typography, Container, Radio, RadioGroup, ThemeProvider } from '@mui/material'
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import Copyright from './Copyright';
import SnackbarMessage from './SnackbarMessage';

const SignUp = (props) => {
    const userCtx = useContext(UserContext);
    const fetchData = useFetch();
    const usernameRef = useRef('');
    const passwordRef = useRef('');
    const emailRef = useRef('');
    const bioRef = useRef('');
    const [gender, setGender] = useState('');


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
        };

        if (bioRef.current.value) {
            outgoingData.bio = bioRef.current.value;
        }

        const res = await fetchData("/auth/register", "PUT", outgoingData);

        if (!res.ok) {
            alert(`Register failed!: ${res.json()}`);
        } else {
            usernameRef.current.value = '';
            passwordRef.current.value = '';
            emailRef.current.value = '';
            bioRef.current.value = '';
            props.snackbarOperations.setSnackbarMessage("Registration Successful!");
            props.snackbarOperations.setSnackbarOpen(true);
        }
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
                        <SnackbarMessage
                            open={props.snackbarOperations.snackbarOpen}
                            message={props.snackbarOperations.snackbarMessage}
                            vertical="top"
                            horizontal="right"
                            setSnackbarOpen={props.snackbarOperations.setSnackbarOpen}
                            setSnackbarMessage={props.snackbarOperations.setSnackbarMessage}></SnackbarMessage>
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
                    <Copyright theme={props.theme} />
                </Container>
            </ThemeProvider >
        </>

    );
}

export default SignUp;