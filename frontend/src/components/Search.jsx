import React, { useState } from "react";
import DetailsModal from "./DetailsModal";

const Search = (props) => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [breweries, setBreweries] = useState([]);
  const [emptyResult, setEmptyResult] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedBrewery, setSelectedBrewery] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // search for breweries by name in airtable
  const searchAirtableData = async (query) => {
    const airtableAPI = `https://api.airtable.com/v0/appQPGY7SNCdqDtdV/Table%201?filterByFormula=SEARCH("${query}", {Name})&maxRecords=1000&view=Grid%20view`;
    const headers = {
      Authorization: `Bearer patxkA4uOl3Cyh9sV.adcda182ede1acc1b0a6684224f61b1b7d78439ac2f7376b6b09a554bdb8f675`,
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(airtableAPI, { headers });
      const data = await response.json();
      return data.records;
    } catch (error) {
      console.error("Error searching data from Airtable:", error);
      return [];
    }
  };

  // search for breweries by name
  const getBreweries = async () => {
    setLoading(true);
    const query = encodeURIComponent(input);

    if (!input) {
      // if no input is provided, clear the breweries and set empty result to true
      setBreweries([]);
      setEmptyResult(true);
      setLoading(false);
      return;
    }

    try {
      const airtableData = await searchAirtableData(query);

      if (airtableData.length < 1) {
        setEmptyResult(true);
      } else {
        setEmptyResult(false);
      }
      const transformedAirtableData = airtableData.map((record) => ({
        id: record.id,
        name: record.fields.Name,
        city: record.fields.City,
        state: record.fields.State,
        brewery_type: record.fields.Type,
        street: record.fields.Address,
        postal_code: record.fields.Postal,
        phone: record.fields.Contact,
        website_url: record.fields.Website,
      }));
      setBreweries(transformedAirtableData);
    } catch (error) {
      console.error("Error fetching brewery data:", error);
    } finally {
      setLoading(false);
    }
  };

  // search results
  const sortBreweries = breweries
    // sort breweries in alphabetical order
    .sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })
    // display brewery details
    .map((brewery) => (
      <>
        <li
          className="list-item"
          key={brewery.id}
          onClick={() => handleBreweryClick(brewery)}
        >
          <div className="list-item-title">
            <h3>{brewery.name}</h3>
          </div>
          <div className="list-item-title">
            <p className="lead">{brewery.city + ", " + brewery.state}</p>
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
          getBreweries={getBreweries}
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
              onClick={getBreweries}
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

// ------------------------ adding data from open brewery list to airtable ------------------------ //
// before adding a new record, fetch existing records from airtable to check if the record already exists
// const checkForDuplicate = async (brewery) => {
//   const url = `https://api.airtable.com/v0/appQPGY7SNCdqDtdV/Table%201?filterByFormula=AND({Name} = '${brewery.name}', {City} = '${brewery.city}')`;

//   const response = await fetch(url, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer patxkA4uOl3Cyh9sV.adcda182ede1acc1b0a6684224f61b1b7d78439ac2f7376b6b09a554bdb8f675`,
//       "Content-Type": "application/json",
//     },
//   });

//   const data = await response.json();
//   return data.records.length > 0;
// };

// post & match brewery and airtable fields
// const postBreweryToAirtable = async (brewery) => {
//   const isDuplicate = await checkForDuplicate(brewery);
//   if (isDuplicate) {
//     console.log(`Duplicate brewery found: ${brewery.name}`);
//     return; // skip adding if a duplicate is found
//   }
//   const url = `https://api.airtable.com/v0/appQPGY7SNCdqDtdV/Table%201`;

//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer patxkA4uOl3Cyh9sV.adcda182ede1acc1b0a6684224f61b1b7d78439ac2f7376b6b09a554bdb8f675`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       fields: {
//         Name: brewery.name,
//         Type: brewery.brewery_type,
//         City: brewery.city,
//         State: brewery.state_province,
//         Address: brewery.street,
//         Postal: brewery.postal_code,
//         Contact: brewery.phone,
//         Website: brewery.website_url,
//       },
//     }),
//   });

//   if (!response.ok) {
//     throw new Error(
//       `Failed to post brewery to Airtable: ${response.statusText}`
//     );
//   }

//   return response.json();
// };

// add all breweries to airtable
// const addBreweriesToAirtable = async () => {
//   for (const brewery of allBreweries) {
//     try {
//       await postBreweryToAirtable(brewery);
//       console.log(`Added brewery: ${brewery.name}`);
//     } catch (error) {
//       console.error(`Error adding brewery: ${error.message}`);
//     }
//   }
// };

// automatically add all breweries to airtable after fetching
// useEffect(() => {
//   if (!loading && !hasMore) addBreweriesToAirtable();
// }, [loading, hasMore]);
