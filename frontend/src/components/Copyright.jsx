// import * as React from 'react';
import { Link, Typography, ThemeProvider } from "@mui/material";

const Copyright = (props) => {
  return (
    <ThemeProvider theme={props.theme}>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
        sx={{ mt: 8, mb: 4 }}
      >
        <Link
          color="inherit"
          href="https://github.com/ftech-glitch/psychic-train"
        >
          Github Link Here!
        </Link>{" "}
      </Typography>
    </ThemeProvider>
  );
};

export default Copyright;
