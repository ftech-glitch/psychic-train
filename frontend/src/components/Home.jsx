import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Details.module.css";
import cheers from "./cheers.png";
import glass from "./glass.png";
import UserContext from "../context/user";

const Home = () => {
  const [randomBrewery, setRandomBrewery] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  // fetch all breweries
  const getBreweries = async () => {
    const res = await fetchData(
      "/api/brewery",
      undefined,
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

  // generate a random brewery from brewery list
  const getRandomBrewery = () => {
    if (allBreweries.length > 0) {
      const randomIndex = Math.floor(Math.random() * allBreweries.length);
      setRandomBrewery(getBreweries[randomIndex]);
      setShowModal(true);
    }
  };

  // close random brewery modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // format phone number
  const formatNumber = (phoneStr) => {
    let cleaned = ("", phoneStr).replace(/\D/g, "");

    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }

    return null;
  };

  // handle phone function
  const renderPhoneNumber = () => {
    if (randomBrewery.phone) {
      return (
        <p className="modal-text">Phone: {formatNumber(randomBrewery.phone)}</p>
      );
    }
    return <p className="modal-text">Phone: -</p>;
  };

  // handle type function
  const renderType = () => {
    if (randomBrewery.brewery_type) {
      return <p className="modal-text">Type: {randomBrewery.brewery_type}</p>;
    }
    return <p className="modal-text">Type: -</p>;
  };

  // handle address function
  const renderAddress = () => {
    if (randomBrewery.street && randomBrewery.postal_code) {
      return (
        <p className="modal-text">
          Address:{" "}
          <a
            href={`https://www.google.com/maps?q=${randomBrewery.street},${randomBrewery.postal_code}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {randomBrewery.street}, {randomBrewery.postal_code}
          </a>
        </p>
      );
    }
    return <p className="modal-text">Address: -</p>;
  };

  // handle website function
  const renderWebsite = () => {
    if (randomBrewery.website_url) {
      return (
        <p className="modal-text">
          Website:{" "}
          <a
            href={randomBrewery.website_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {randomBrewery.website_url}
          </a>
        </p>
      );
    }
    return <p className="modal-text">Website: -</p>;
  };

  return (
    <>
      <></>
      <br />
      <div className="image-container">
        <img src={cheers} alt="cheers" className="cheers" />
      </div>
      <br />
      <br />
      <h1 className="header">Discover Your Next HopSpot</h1>
      <h5 className="subheader">Connecting beer enthusiasts with breweries</h5>
      <br />
      <br />
      {/* buttons */}
      <div className="d-flex justify-content-center">
        <div className="col-md-3">
          <button
            className="btn btn-dark"
            type="button"
            id="button-addon1"
            data-ripple-color="dark"
            onClick={getRandomBrewery}
          >
            Generate a random brewery
          </button>
        </div>
        <div className="col-md-3">
          <Link to="/search" className="btn btn-dark" role="button">
            Search for breweries
          </Link>
        </div>
      </div>
      <br />
      <br />
      {/* random brewery modal */}
      {randomBrewery && showModal && (
        <div className={styles.backdrop}>
          <div className={styles.modal}>
            <div className="row align-items-center">
              <div className="col-md-3 text-center">
                <img src={glass} alt="glass" className="glass" />
              </div>
              <div className="col-md-6 text-center">
                <h5 className="random-brewery">Your Brewery of the Day </h5>
              </div>
              <div className="col-md-3 text-center">
                <img src={glass} alt="glass" className="glass" />
              </div>
            </div>
            <br />
            <p className="modal-text">Name: {randomBrewery.name}</p>
            {renderType()}
            {renderAddress()}
            {renderPhoneNumber()}
            {renderWebsite()}
            <div className={styles.buttonGroup}>
              <button className={styles.modalButton} onClick={handleCloseModal}>
                close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
