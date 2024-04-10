import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Add = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [breweries, setBreweries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [postal, setPostal] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState("");

  // close alert message
  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  const handleCloseError = () => {
    setShowError(false);
  };

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
      setLoading(false);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  // add new brewery
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !type ||
      !city ||
      !province ||
      !address ||
      !postal ||
      !contact ||
      !website
    ) {
      setShowError(true);
      setFetchError("Please fill in all fields.");
      return;
    }
    const res = await fetchData(
      "/api/brewery",
      "PUT",
      {
        name: name,
        type: type,
        city: city,
        state: province,
        address: address,
        postal: postal,
        contact: contact,
        website: website,
      },
      userCtx.accessToken
    );

    if (res.ok) {
      fetchBreweries();
      setShowSuccess(true);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
      setShowError(true);
    }
  };

  return (
    <>
      <br />
      <br />
      {/* form submission */}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label className="col-md-2">Name:</label>
          <input
            type="text"
            aria-label="Search"
            className="col-md-3"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <br />
        <div className="row">
          <label className="col-md-2">Type:</label>
          <input
            type="text"
            aria-label="Search"
            className="col-md-3"
            placeholder="type"
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <br />
        <div className="row">
          <label className="col-md-2">City:</label>
          <input
            type="text"
            aria-label="Search"
            className="col-md-3"
            placeholder="city"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <br />
        <div className="row">
          <label className="col-md-2">State:</label>
          <input
            type="text"
            placeholder="state"
            aria-label="Search"
            className="col-md-3"
            onChange={(e) => setProvince(e.target.value)}
          />
        </div>
        <br />
        <div className="row">
          <label className="col-md-2">Address:</label>
          <input
            type="text"
            aria-label="Search"
            className="col-md-3"
            placeholder="address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <br />
        <div className="row">
          <label className="col-md-2">Postal Code:</label>
          <input
            type="text"
            aria-label="Search"
            className="col-md-3"
            placeholder="postal code"
            onChange={(e) => setPostal(e.target.value)}
          />
        </div>
        <br />
        <div className="row">
          <label className="col-md-2">Contact:</label>
          <input
            type="text"
            aria-label="Search"
            className="col-md-3"
            placeholder="contact"
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <br />
        <div className="row">
          <label className="col-md-2">Website:</label>
          <input
            type="text"
            aria-label="Search"
            className="col-md-3"
            placeholder="website"
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <br />
        <br />
        <div className="row text-center">
          <button
            className="btn btn-dark mx-1 col-md-1"
            type="submit"
            id="button-addon2"
            data-ripple-color="dark"
          >
            submit
          </button>
        </div>
      </form>
      {/* alert message */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
      >
        <MuiAlert
          onClose={handleCloseSuccess}
          severity="success"
          sx={{ width: "100%" }}
        >
          Form submitted successfully!
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <MuiAlert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          {fetchError}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default Add;
