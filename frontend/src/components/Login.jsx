import React, { useContext, useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { jwtDecode } from "jwt-decode";

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import Copyright from "./Copyright";

const Login = (props) => {
    const fetchData = useFetch();
    const userCtx = useContext(UserContext);

    const usernameRef = useRef('');
    const passwordRef = useRef('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const completeProfile = {};

        const res = await fetchData("/auth/login", "POST", { username: usernameRef.current.value, password: passwordRef.current.value });

        if (res.ok) {
            userCtx.setAccessToken(res.data.access);
            const decoded = jwtDecode(res.data.access);
            userCtx.setRole(decoded.role);

            const profile = await fetchData("/auth/users/profile", "GET", undefined, res.data.access);

            if (profile.ok) {
                completeProfile.username = profile.data.userInfo.userNAME;
                completeProfile.email = profile.data.userInfo.userEMAIL;
                completeProfile.gender = profile.data.userInfo.userGENDER;
                completeProfile.bio = profile.data.userProfile.bio ? profile.data.userProfile.bio : "";
                completeProfile.profile = profile.data.userProfile.profile ? profile.data.userProfile.profile : "https://i.pravatar.cc/200";

                userCtx.setUserProfile(completeProfile);
            } else {
                alert(JSON.stringify(profile.data));
                console.log(profile.data);
            }
        } else {
            alert(JSON.stringify(res.data));
        }
    };


    return (
        <ThemeProvider theme={props.theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            inputRef={usernameRef}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            inputRef={passwordRef}
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            {props.setShowLogin && (
                                <>
                                    <Grid item>
                                        <Link onClick={() => {
                                            props.setShowLogin(false);
                                        }} variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Box>
                </Box>
                <Copyright theme={props.theme}></Copyright>
            </Container>
        </ThemeProvider>
    );
};

export default Login;