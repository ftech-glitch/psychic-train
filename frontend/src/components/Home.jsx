import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Details.module.css";
import cheers from "./cheers-fireworks.gif";
import background_video01 from "../img/brewery_video01.mp4";
import glass from "./glass.png";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Sidebar from "./Sidebar";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const Home = (props) => {
  const [randomBrewery, setRandomBrewery] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [allBreweries, setAllBreweries] = useState([]);
  const [loading, setLoading] = useState(true);
  //conflict
  const [hasMore, setHasMore] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const userCtx = useContext(UserContext);
  const [breweries, setBreweries] = useState([]);
  const fetchData = useFetch();

  const navigate = useNavigate();

  const defaultTheme = createTheme();
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#90caf9",
      },
      secondary: {
        main: "#ffcc80",
      },
    },
  });

  // fetch brewery list when component mounts
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
      setAllBreweries(res.data);
      setLoading(false);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

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

  // handle name fuction
  const renderName = () => {
    if (randomBrewery.Name) {
      return <p className="modal-text">Name: {randomBrewery.Name}</p>;
    }
    return <p className="modal-text">Name: -</p>;
  };

  // handle phone function
  const renderPhoneNumber = () => {
    if (randomBrewery.Contact) {
      return <p className="modal-text">Phone: {randomBrewery.Contact}</p>;
    }
    return <p className="modal-text">Phone: -</p>;
  };

  // handle type function
  const renderType = () => {
    if (randomBrewery.Type) {
      return <p className="modal-text">Type: {randomBrewery.Type}</p>;
    }
    return <p className="modal-text">Type: -</p>;
  };

  // handle address function
  const renderAddress = () => {
    if (randomBrewery.Address && randomBrewery.Postal) {
      return (
        <p className="modal-text">
          Address:{" "}
          <a
            href={`https://www.google.com/maps?q=${randomBrewery.street},${randomBrewery.postal_code}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {randomBrewery.Address}, {randomBrewery.Postal}
          </a>
        </p>
      );
    }
    return <p className="modal-text">Address: -</p>;
  };

  // handle website function
  const renderWebsite = () => {
    if (randomBrewery.Website) {
      return (
        <p className="modal-text">
          Website:{" "}
          <a
            href={randomBrewery.Website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {randomBrewery.Website}
          </a>
        </p>
      );
    }
    return <p className="modal-text">Website: -</p>;
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          {/* Background video */}
          <video
            autoPlay
            loop
            muted
            style={{
              position: "absolute",
              width: "100%",
              left: "50%",
              top: "50%",
              height: "100%",
              objectFit: "cover",
              transform: "translate(-50%, -50%)",
              zIndex: "-1",
            }}
          >
            <source src={background_video01} type="video/mp4" />
          </video>
          <Box
            sx={{
              margin: "1rem",
              display: "grid",
              gridTemplateColumns: "70% 30%",
              alignItems: "start",
              justifyContent: "center",
            }}
          >
            <Grid container item xs={12} justifyContent="center" spacing={2}>
              <Grid item xs={12} sx={{ margin: "2rem" }}>
                <img
                  src={cheers}
                  alt="cheers"
                  style={{ width: "300px", height: "200px" }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h2" className="header">
                  Discover Your Next HopSpot
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h5" className="subheader">
                  Connecting beer enthusiasts with breweries
                </Typography>
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
              {userCtx.isSignedIn && (
                <Grid item>
                  <Button
                    // href="/search"
                    variant="contained"
                    color="primary"
                    role="button"
                    onClick={() => {
                      navigate("/search");
                    }}
                  >
                    Search for breweries
                  </Button>
                </Grid>
              )}
            </Grid>

            <Grid
              container
              item
              sx={{
                height: "100%",
              }}
            >
              <Grid item>
                <Sidebar
                  accessTokenLength={props.accessTokenLength}
                  showLogin={props.showLogin}
                  setShowLogin={props.setShowLogin}
                  theme={darkTheme}
                ></Sidebar>
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
                <img
                  src={glass}
                  alt="glass"
                  className="glass"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
              <div className="col-md-6 text-center">
                <Typography variant="h5" className="random-brewery">
                  Your Brewery of the Day{" "}
                </Typography>
              </div>
              <div className="col-md-3 text-center">
                <img
                  src={glass}
                  alt="glass"
                  className="glass"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            </div>
            <br />
            {renderName()}
            {renderType()}
            {renderAddress()}
            {renderPhoneNumber()}
            {renderWebsite()}
            <div className={styles.buttonGroup}>
              <Button
                variant="contained"
                color="primary"
                className={styles.modalButton}
                onClick={handleCloseModal}
              >
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
