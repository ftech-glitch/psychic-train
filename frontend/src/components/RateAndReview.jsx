import React, { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const RateAndReview = (props) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();

  console.log("Breweries:", props.allBreweries);

  const handleBreweryChange = (event) => {
    const breweryName = event.target.value;
    const brewery = props.allBreweries.find(
      (brewery) => brewery.Name === breweryName
    );
    props.setSelectedBrewery(brewery);
  };

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!props.selectedBrewery) {
      alert("Please select a brewery");
      return;
    }
    if (rating === 0) {
      alert("Please provide a rating");
      return;
    }
    if (review.trim() === "") {
      alert("Please provide a review");
      return;
    }
    const data = {
      breweryName: props.selectedBrewery.Name,
      rating: rating,
      review: review,
    };

    //     const res = await fetchData(
    //       "/api/reviews",
    //       "POST",
    //       data,
    //       userCtx.accessToken
    //     );
    //     if (res.ok) {
    //       alert("Review submitted successfully");
    //     } else {
    //       alert("Failed to submit review: " + res.error);
    //     }
  };

  return (
    <div>
      <h2>Rate and Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="brewery">Select Brewery:</label>
          <select id="brewery" onChange={handleBreweryChange} required>
            <option value="">Select Brewery</option>
            {props.allBreweries &&
              props.allBreweries.map((brewery) => (
                <option key={brewery._id} value={brewery.Name}>
                  {brewery.Name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>Rating:</label>
          <select
            id="rating"
            value={rating}
            onChange={handleRatingChange}
            required
          >
            <option value="">Select Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <label>Review:</label>
          <textarea
            id="review"
            value={review}
            onChange={handleReviewChange}
            required
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default RateAndReview;
