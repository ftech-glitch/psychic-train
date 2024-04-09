import React from 'react';
import { Snackbar, Box, SnackbarContent } from '@mui/material';

const SnackbarMessage = (props) => {
    return (
        <Box sx={{ width: 500 }}>
            <Snackbar
                anchorOrigin={{ vertical: props.vertical, horizontal: props.horizontal }}
                open={props.open}
                autoHideDuration={2000}
                onClose={() => { props.setSnackbarMessage(""); props.setSnackbarOpen(false) }}
            >
                <SnackbarContent message={props.message} />
            </Snackbar>
        </Box>
    );
};

export default SnackbarMessage;