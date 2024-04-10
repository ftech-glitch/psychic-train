import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const RateAndReview = () => {
  const [selectedBrewery, setSelectedBrewery] = useState("");
  const [breweries, setBreweries] = useState([]);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(true);
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();

  useEffect(() => {
    fetchBreweries();
    console.log("fetch breweries", breweries);
  }, []);

  // fetch brewery list
  const fetchBreweries = async () => {
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
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const handleBreweryChange = (event) => {
    setSelectedBrewery(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = () => {
    if (rating && review) {
      // onSubmit({ rating, review }); --> create api endpoint to add rating & review
      setRating(0);
      setReview("");
    } else {
      alert("Please provide both rating and review.");
    }
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
        <Rating name="rating" defaultValue={2} precision={1} />
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
          <option key={brewery._id} value={brewery.Name}>
            {brewery.Name}
          </option>
        ))}
      </TextField>
      {/* Rating input field */}
      {/* <TextField
        select
        fullWidth
        label="Rating"
        value={rating}
        onChange={handleRatingChange}
        SelectProps={{
          native: true,
        }}
        sx={{ mb: 2 }}
      >
        {[...Array(5)].map((_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </TextField> */}
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
    </Box>
  );
};

export default RateAndReview;
