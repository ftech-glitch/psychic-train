// import * as React from 'react';
import React, { useEffect, useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import glass from "./glass.png";
import cheers from "./cheers.png";
import useFetch from "../hooks/useFetch";

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

export default function SignUp(props) {
    // const fetchData = useFetch();
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const [email, setEmail] = useState("");
    // const [bio, setBio] = useState("");
    // const [gender, setGender] = useState('other');
    // const [profile, setProfile] = useState('placeholder');
    const fetchData = useFetch();
    const usernameRef = useRef('');
    const passwordRef = useRef('');
    const emailRef = useRef('');
    const bioRef = useRef('');
    // const genderRef = useRef('other');
    const [gender, setGender] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const outgoingData = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            email: emailRef.current.value,
            gender: gender
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
                    <Copyright sx={{ mt: 5 }} />

                </Container>
            </ThemeProvider>
            {/* <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                
            </Grid> */}

        </>

    );
}