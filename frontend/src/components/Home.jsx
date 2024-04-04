import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Details.module.css";
import cheers from "./cheers.png";
import glass from "./glass.png";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Sidebar from "./Sidebar";

const Home = (props) => {
  const [randomBrewery, setRandomBrewery] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [allBreweries, setAllBreweries] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const defaultTheme = createTheme();
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9',
      },
      secondary: {
        main: '#ffcc80',
      },
    },
  });
  // fetch brewery list
  useEffect(() => {
    const fetchBreweries = async () => {
      setLoading(true);
      const response = await fetch(
        `https://api.openbrewerydb.org/breweries?page=${page}&per_page=50`
      );
      const data = await response.json();
      if (data.length > 0) {
        setAllBreweries((prevBreweries) => [...prevBreweries, ...data]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    };

    // Check if the current page is different from the previous page
    if (page > 1) {
      fetchBreweries();
    }
  }, [page]);

  // generate a random brewery from brewery list
  const getRandomBrewery = () => {
    if (allBreweries.length > 0) {
      const randomIndex = Math.floor(Math.random() * allBreweries.length);
      setRandomBrewery(allBreweries[randomIndex]);
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
      <ThemeProvider theme={darkTheme}>

        <Grid container component="main" sx={{ height: '100vh' }}>

          <CssBaseline />
          <Box
            sx={{
              margin: '1rem',
              display: 'grid',
              gridTemplateColumns: "70% 30%",
              alignItems: 'start',
              justifyContent: 'center'
            }}
          >
            <Grid container item xs={12} justifyContent="center" spacing={2}>
              <Grid item xs={12} sx={{ margin: "2rem" }}>
                <img src={cheers} alt="cheers" style={{ width: '200px', height: '200px' }} />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h2" className="header">Discover Your Next HopSpot</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h5" className="subheader">Connecting beer enthusiasts with breweries</Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={getRandomBrewery}
                >
                  Generate a random brewery
                </Button>
              </Grid>
              <Grid item>
                <Button href="/search" variant="contained" color="primary" role="button">
                  Search for breweries
                </Button>
              </Grid>
            </Grid>

            <Grid container item sx={{
              "height": "100%",
            }}>
              <Grid item>
                <Sidebar accessTokenLength={props.accessTokenLength} showLogin={props.showLogin} setShowLogin={props.setShowLogin} theme={darkTheme}></Sidebar>
              </Grid>

            </Grid>
          </Box>
        </Grid>


      </ThemeProvider>

      {/* random brewery modal */}
      {randomBrewery && showModal && (
        <div className={styles.backdrop}>
          <div className={styles.modal}>
            <div className="row align-items-center">
              <div className="col-md-3 text-center">
                <img src={glass} alt="glass" className="glass" style={{ width: '100px', height: '100px' }} />
              </div>
              <div className="col-md-6 text-center">
                <Typography variant="h5" className="random-brewery">Your Brewery of the Day </Typography>
              </div>
              <div className="col-md-3 text-center">
                <img src={glass} alt="glass" className="glass" style={{ width: '100px', height: '100px' }} />
              </div>
            </div>
            <br />
            <Typography variant="body1" className="modal-text">Name: {randomBrewery.name}</Typography>
            {renderType()}
            {renderAddress()}
            {renderPhoneNumber()}
            {renderWebsite()}
            <div className={styles.buttonGroup}>
              <Button variant="contained" color="primary" className={styles.modalButton} onClick={handleCloseModal}>
                close
              </Button>
            </div>
          </div>
        </div>
      )}


    </>
  );
};

export default Home;
