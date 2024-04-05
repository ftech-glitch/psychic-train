import React, { useContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import glass from "./glass.png";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Login from './Login';
import SignUp from './SignUp';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import UserProfile from './UserProfile';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            <Link color="inherit" href="https://github.com/ftech-glitch/psychic-train">
                Github Link Here!
            </Link>{' '}
        </Typography>
    );
}

const Sidebar = (props) => {
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
                                <SignUp theme={props.theme} setShowLogin={props.setShowLogin}></SignUp>
                            </Grid>
                        </>
                    )}
                    {props.accessTokenLength !== 0 && !props.showLogin && (
                        <UserProfile theme={props.theme} setShowLogin={props.setShowLogin}></UserProfile>
                    )}
                </Box>


            </Container>
        </ThemeProvider >
    );
};

export default Sidebar;