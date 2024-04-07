import React, { useContext } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Grid from "@mui/material/Grid";
import { ThemeProvider } from '@mui/material/styles';
import UserContext from "../context/user";

const UserProfile = (props) => {
    const userCtx = useContext(UserContext);

    return (
        <Box sx={{ position: "absolute", top: 0, bottom: 0, right: 0, background: "#78A083" }}>
            <ThemeProvider theme={props.theme}>
                <CssBaseline />
                <Grid container spacing={4} component="main" maxWidth="xs" sx={{
                    marginTop: 16,
                    gridAutoRows: "repeat(2, 1fr)",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    {/* Profile Photo */}
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Avatar sx={{ bgcolor: 'white', width: 100, height: 100, marginBottom: 5 }}>
                            <img src="https://i.pravatar.cc/200"></img>
                        </Avatar>
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
                </Grid>

            </ThemeProvider>
        </Box>
    );
};

export default UserProfile;

