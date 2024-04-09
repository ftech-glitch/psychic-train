import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Container, Box, Avatar, Grid } from '@mui/material'
import Login from './Login';
import SignUp from './SignUp';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import UserProfile from './UserProfile';

const Sidebar = (props) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const snackbarOperations = {
        snackbarOpen: snackbarOpen,
        setSnackbarOpen: setSnackbarOpen,
        snackbarMessage: snackbarMessage,
        setSnackbarMessage: setSnackbarMessage
    }

    return (
        <ThemeProvider theme={props.theme}>
            <CssBaseline />
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {props.accessTokenLength === 0 && props.showLogin && (
                        <>
                            <Avatar sx={{ m: 1, marginTop: 6, bgcolor: 'white' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Grid>
                                <Login theme={props.theme} setShowLogin={props.setShowLogin}></Login>
                            </Grid></>
                    )}
                    {props.accessTokenLength === 0 && !props.showLogin && (
                        <>
                            <Avatar sx={{ m: 1, marginTop: 6, bgcolor: 'white' }}>
                                <AppRegistrationIcon />
                            </Avatar>
                            <Grid>
                                <SignUp theme={props.theme} setShowLogin={props.setShowLogin} snackbarOperations={snackbarOperations}></SignUp>
                            </Grid>
                        </>
                    )}
                    {props.accessTokenLength !== 0 && !props.showLogin && (
                        <UserProfile theme={props.theme} setShowLogin={props.setShowLogin} snackbarOperations={snackbarOperations}></UserProfile>
                    )}
                </Box>
            </Container>
        </ThemeProvider >
    );
};

export default Sidebar;