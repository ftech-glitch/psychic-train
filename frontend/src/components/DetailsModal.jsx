import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import styles from "./Details.module.css";
import UpdateForm from "./UpdateForm";
import glass from "./glass.png";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import IconButton from "@mui/material/IconButton";
import SnackbarMessage from "./SnackbarMessage";


const OverLay = ({ setShowUpdateModal, brewery, setBreweries }) => {
  const [editMode, setEditMode] = useState(false);
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [editedBrewery, setEditedBrewery] = useState({
    Name: brewery.Name,
    Type: brewery.Type,
    City: brewery.City,
    State: brewery.State,
    Address: brewery.Address,
    Postal: brewery.Postal,
    Contact: brewery.Contact,
    Website: brewery.Website,
  });
  const [averageRating, setAverageRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [faves, setFaves] = useState([]);

  // fetch ratings and reviews
  const fetchRatingAndReviews = async () => {
    try {
      const ratingRes = await fetchData(
        `/api/brewery/averagerating/${brewery._id}`,
        "GET",
        undefined,
        userCtx.accessToken
      );

      console.log("Rating response:", ratingRes.data);
      if (ratingRes.ok) {
        setAverageRating(ratingRes.data.averageRating.toFixed(1));
      } else {
        console.error("Error fetching average rating:", ratingRes.data);
      }

      const reviewRes = await fetchData(
        `/api/brewery/review/${brewery._id}`,
        "GET",
        undefined,
        userCtx.accessToken
      );
      if (reviewRes.ok) {
        setReviews(reviewRes.data.reviews);
      } else {
        console.error("Error fetching reviews:", reviewRes.data);
      }
    } catch (error) {
      console.error("Error fetching rating and reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    fetchRatingAndReviews();
  }, []);

  // close modal
  const handleCloseModal = () => {
    setShowUpdateModal(false);
  };

  // handle input changes
  const handleInputChange = (name, value) => {
    setEditedBrewery((prevBrewery) => ({
      ...prevBrewery,
      [name]: value,
    }));
  };

  // update brewery
  const handleSaveChanges = async (id, payload) => {
    console.log("handleSaveChanges sending: ", payload);
    const res = await fetchData(
      `/api/brewery/${id}`,
      "PATCH",
      payload,
      userCtx.accessToken
    );

    console.log("fetch edited brewery", res);
    console.log("sending payload", payload);

    if (res.ok) {
      // update local state or trigger a refresh of brewery data
      fetchBreweries();
      handleCloseModal();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  // delete brewery
  const handleDelete = async () => {
    const res = await fetchData(
      `/api/brewery/${brewery._id}`,
      "DELETE",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      fetchBreweries();
      handleCloseModal();
      console.log("deleted");
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  // handle cancel edits
  const handleCancel = () => {
    setEditMode(false);
  };

  // handle phone function
  const renderPhoneNumber = () => {
    if (brewery.Contact) {
      return <p className="modal-text">Phone: {brewery.Contact}</p>;
    }
    return <p className="modal-text">Phone: -</p>;
  };

  // handle name function
  const renderName = () => {
    if (brewery.Name) {
      return <p className="modal-text">Name: {brewery.Name}</p>;
    }
    return <p className="modal-text">Name: -</p>;
  };

  // handle type function
  const renderType = () => {
    if (brewery.Type) {
      return <p className="modal-text">Type: {brewery.Type}</p>;
    }
    return <p className="modal-text">Type: -</p>;
  };

  // handle address function
  const renderAddress = () => {
    if (brewery.Address && brewery.Postal) {
      return (
        <p className="modal-text">
          Address:{" "}
          <a
            href={`https://www.google.com/maps?q=${brewery.Address},${brewery.Postal}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {brewery.Address}, {brewery.Postal}
          </a>
        </p>
      );
    }
    return <p className="modal-text">Address: -</p>;
  };

  // handle website function
  const renderWebsite = () => {
    if (brewery.Website) {
      return (
        <p className="modal-text">
          Website:{" "}
          <a href={brewery.Website} target="_blank" rel="noopener noreferrer">
            {brewery.Website}
          </a>
        </p>
      );
    }
    return <p className="modal-text">Website: -</p>;
  };

  const favouriteBrewery = async () => {
    try {
      const requestBody = {
        breweryid: brewery._id,
      };

      const res = await fetchData(
        "/auth/brewery/favourite",
        "PUT",
        requestBody,
        userCtx.accessToken
      );

      if (res.ok) {
        getUsersFavouriteBreweries();
        setSnackbarMessage("Brewery favourited!");
        setSnackbarOpen(true);
      } else {
        alert(JSON.stringify(res.data));
        console.log(res.data);
      }
    } catch (error) {
      console.error("Error favouriting brewery: ", error.message);
    }
  };

  const unfavouriteBrewery = async () => {
    try {
      const res = await fetchData(
        "/auth/brewery/favouriteS",
        "POST",
        { breweryid: brewery._id },
        userCtx.accessToken
      );

      if (res.ok) {
        getUsersFavouriteBreweries();
        setSnackbarMessage("Brewery unfavourited!");
        setSnackbarOpen(true);
      } else {
        alert(JSON.stringify(res.data));
        console.log(res.data);
      }
    } catch (error) {
      console.error("Error unfavouriting brewery: ", error.message);
    }
  };

  const getUsersFavouriteBreweries = async () => {
    const userFaves = await fetchData(
      "/auth/brewery/favourites",
      undefined,
      undefined,
      userCtx.accessToken
    );

    if (userFaves.ok) {
      setFaves(userFaves.data.favourite);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  useEffect(() => {
    if (userCtx.isSignedIn) {
      getUsersFavouriteBreweries();
    }
  }, [userCtx.accessToken]);


  // render the average rating of brewery as stars
  const renderRatingStars = () => {
    const filledStars = Math.round(averageRating);
    const emptyStars = 5 - filledStars;

    const filledStarsArray = Array.from({ length: filledStars }, (_, i) => (
      <StarIcon key={`filled-${i}`} style={{ color: "gold" }} />
    ));

    const emptyStarsArray = Array.from({ length: emptyStars }, (_, i) => (
      <StarBorderIcon key={`empty-${i}`} style={{ color: "gold" }} />
    ));

    return (
      <div className={styles.rating}>
        <p className="modal-text">Rating: {averageRating}/5</p>
        {filledStarsArray}
        {emptyStarsArray}
      </div>
    );
  };

  // render all reviews of the brewery
  const renderReviews = () => {
    return (
      <div className={styles.reviews}>
        <p className="modal-text">Reviews:</p>
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              <span className={styles.reviewItem}>{review.review}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <SnackbarMessage
          open={snackbarOpen}
          message={snackbarMessage}
          vertical="center"
          horizontal="center"
          setSnackbarOpen={setSnackbarOpen}
          setSnackbarMessage={setSnackbarMessage}
        ></SnackbarMessage>

        {/* edit modal*/}
        {editMode ? (
          <UpdateForm
            brewery={brewery}
            handleInputChange={handleInputChange}
            handleSaveChanges={handleSaveChanges}
            handleCancel={handleCancel}
            editedBrewery={editedBrewery}
            setEditedBrewery={setEditedBrewery}
          />
        ) : (
          // details modal
          <div className="row align-items-center">
            <div className="row align-items-center">
              <div className="col-md-2 text-center">
                <img src={glass} alt="glass" className="glass" />
              </div>
              <div className="col-md-7 text-center">
                <h5 className="random-brewery">{brewery.Name}</h5>
              </div>
              <div className="col-md-2 text-center">
                <img src={glass} alt="glass" className="glass" />
              </div>
              <div className="col-md-1 text-center">

                {!faves.includes(brewery._id) && (
                  <IconButton onClick={favouriteBrewery} aria-label="favourite">
                    <StarBorderIcon
                      sx={{
                        color: "#278efc",
                      }}
                    />
                  </IconButton>
                )}
                {faves.includes(brewery._id) && (
                  <IconButton
                    onClick={unfavouriteBrewery}
                    aria-label="favourite"
                  >
                    <StarIcon
                      sx={{
                        color: "#278efc",
                      }}
                    />
                  </IconButton>
                )}
                <p style={{ color: "#278efc", position: "absolute" }}>
                  {snackbarMessage}
                </p>
              </div>
            </div>
            {/* Render name, type, address, phone, and website */}
            {renderName()}
            {renderType()}
            {renderAddress()}
            {renderPhoneNumber()}
            {renderWebsite()}
            {averageRating && renderRatingStars()}{" "}
            {reviews.length > 0 && renderReviews()}{" "}
            <div className={styles.buttonGroup}>
              <button
                className={styles.modalButton}
                onClick={() => setEditMode(true)}
              >
                edit
              </button>
              <button className={styles.modalButton} onClick={handleDelete}>
                delete
              </button>
              <button className={styles.modalButton} onClick={handleCloseModal}>
                close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DetailsModal = ({
  breweries,
  setBreweries,
  brewery,
  setShowUpdateModal,
}) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          brewery={brewery}
          setBreweries={setBreweries}
          setShowUpdateModal={setShowUpdateModal}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default DetailsModal;
