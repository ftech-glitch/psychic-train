import React, { useState, useRef, useContext } from "react";
import DetailsModal from "./DetailsModal";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import RateAndReview from "./RateAndReview";

const Search = (props) => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [breweries, setBreweries] = useState([]);
  const [emptyResult, setEmptyResult] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedBrewery, setSelectedBrewery] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const nameRef = useRef("");

  // search for breweries by name
  const searchBreweries = async () => {
    setLoading(true);
    const res = await fetchData(
      "/api/brewery",
      "POST",
      {
        Name: nameRef.current.value,
      },
      userCtx.accessToken
    );

    if (res.ok) {
      setBreweries(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }

    setLoading(false);
    setEmptyResult(res.data.length === 0);
  };

  // search results
  const sortBreweries = breweries
    // sort breweries in alphabetical order
    .sort(function (a, b) {
      if (a.Name < b.Name) {
        return -1;
      }
      if (a.Name > b.Name) {
        return 1;
      }
      return 0;
    })
    // display brewery details
    .map((brewery) => (
      <>
        <li
          className="list-item"
          key={brewery._id}
          onClick={() => handleBreweryClick(brewery)}
        >
          <div className="list-item-title">
            <h3>{brewery.Name}</h3>
          </div>
          <div className="list-item-title">
            <p className="lead">{brewery.City + ", " + brewery.State}</p>
          </div>
        </li>
      </>
    ));

  // clear button
  const handleClearingResults = () => {
    setBreweries([]);
    setEmptyResult(false);
    setInput("");
  };

  // show more details of selected brewery
  const handleBreweryClick = (brewery) => {
    setShowUpdateModal(true);
    setSelectedBrewery(brewery);
  };

  // close modal
  const handleCloseModal = () => {
    setShowUpdateModal(false);
  };

  return (
    <>
      {/* prop to detailsmodal */}
      {showUpdateModal && (
        <DetailsModal
          brewery={selectedBrewery}
          setShowUpdateModal={setShowUpdateModal}
          fetchBreweries={props.fetchBreweries}
          handleCloseModal={handleCloseModal}
          setEditMode={setEditMode}
          formatNumber={props.formatNumber}
        ></DetailsModal>
      )}
      <main>
        {/* search bar */}
        <div className="search-bar-container">
          <div className="input-group">
            <input
              type="text"
              value={input}
              placeholder="Search breweries"
              aria-label="Search"
              className="form-control rounded-right"
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="btn btn-dark mx-1"
              type="button"
              id="button-addon1"
              data-ripple-color="dark"
              onClick={searchBreweries}
            >
              SEARCH
            </button>
            <button
              className="btn btn-dark mx-1"
              type="button"
              id="button-addon2"
              data-ripple-color="dark"
              onClick={handleClearingResults}
            >
              CLEAR
            </button>
          </div>
        </div>
        {/* search results */}
        <div className="results-container">
          {loading && (
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
          <ul className="list">{breweries && sortBreweries}</ul>
          {emptyResult === true && (
            <p className="lead text-center">NO RESULTS</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Search;
