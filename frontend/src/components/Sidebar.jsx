import React from 'react';
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
                    <Avatar sx={{ m: 1, marginTop: 6, bgcolor: 'white' }}>
                        <img src={glass} width={"30px"} height={"30px"}></img>
                    </Avatar>
                    <Grid>
                        {props.accessTokenLength === 0 && props.showLogin && <Login theme={props.theme} setShowLogin={props.setShowLogin}></Login>}
                    </Grid>

                    <Grid>
                        {props.accessTokenLength === 0 && !props.showLogin && <SignUp theme={props.theme} setShowLogin={props.setShowLogin}></SignUp>}
                    </Grid>
                    <Copyright sx={{ mt: 5 }} />
                </Box>


            </Container>
        </ThemeProvider>
    );
};

export default Sidebar;