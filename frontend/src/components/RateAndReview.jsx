import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const RateAndReview = () => {
  const [selectedBrewery, setSelectedBrewery] = useState("");
  const [breweries, setBreweries] = useState([]);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();

  useEffect(() => {
    fetchBreweries();
  }, []);

  // fetch brewery list
  const fetchBreweries = async () => {
    try {
      const res = await fetchData(
        "/api/brewery",
        "GET",
        undefined,
        userCtx.accessToken
      );
      if (res.ok) {
        setBreweries(res.data);
        setLoading(false);
      } else {
        showAlert(JSON.stringify(res.data), "error");
        console.log(res.data);
      }
    } catch (error) {
      console.error("Error fetching breweries:", error);
      showAlert("Error fetching breweries. Please try again later.", "error");
    }
  };

  const handleBreweryChange = (event) => {
    setSelectedBrewery(event.target.value);
  };

  const handleRatingChange = (newValue) => {
    setRating(newValue);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (rating && review && selectedBrewery) {
        const ratingData = {
          score: rating.toString(),
          breweryId: selectedBrewery,
        };

        const reviewData = {
          review: review,
          breweryId: selectedBrewery,
        };

        const ratingRes = await fetchData(
          `/api/brewery/rating/${selectedBrewery}`,
          "PUT",
          ratingData,
          userCtx.accessToken
        );
        const reviewRes = await fetchData(
          `/api/brewery/review/${selectedBrewery}`,
          "PUT",
          reviewData,
          userCtx.accessToken
        );

        if (ratingRes.ok && reviewRes.ok) {
          showAlert("Rating and review added successfully.", "success");
          setRating(0);
          setReview("");
        } else {
          showAlert("Failed to add rating and review.", "error");
        }
      } else {
        showAlert(
          "Please provide both rating, review, and select a brewery.",
          "warning"
        );
      }
    } catch (error) {
      console.error("Error submitting rating and review:", error);
      showAlert(
        "Error submitting rating and review. Please try again later.",
        "error"
      );
    }
  };

  const showAlert = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        backgroundColor: "white",
        padding: "1rem",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "left",
      }}
    >
      <Typography variant="h6" gutterBottom color="black">
        Rate and Review
      </Typography>
      <Stack spacing={1}>
        <Rating
          name="rating"
          value={rating}
          precision={1}
          onChange={(event, newValue) => {
            handleRatingChange(newValue);
          }}
        />
      </Stack>
      <TextField
        select
        fullWidth
        label="Brewery"
        value={selectedBrewery}
        onChange={handleBreweryChange}
        SelectProps={{
          native: true,
        }}
        sx={{ mb: 2 }}
      >
        <option value="" disabled></option>
        {breweries.map((brewery) => (
          <option key={brewery._id} value={brewery._id}>
            {brewery.Name}
          </option>
        ))}
      </TextField>
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Review"
        value={review}
        onChange={handleReviewChange}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default RateAndReview;
