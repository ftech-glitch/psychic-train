import React, { useState } from "react";

const Add = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [postal, setPostal] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // add new brewery to airtable
  const handleSubmit = async (e) => {
    e.preventDefault();
    const airtableAPI =
      "https://api.airtable.com/v0/appQPGY7SNCdqDtdV/Table%201";
    const apiKey =
      "patxkA4uOl3Cyh9sV.adcda182ede1acc1b0a6684224f61b1b7d78439ac2f7376b6b09a554bdb8f675";
    const headers = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };
    const data = {
      fields: {
        Name: name,
        Type: type,
        City: city,
        State: province,
        Address: address,
        Postal: postal,
        Contact: contact,
        Website: website,
      },
    };

    try {
      const response = await fetch(airtableAPI, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);
      setName("");
      setType("");
      setAddress("");
      setPostal("");
      setCity("");
      setProvince("");
      setContact("");
      setWebsite("");
      setShowSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  // close alert message
  const handleCloseSuccess = () => {
    setShowSuccess(false);
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
            placeholder="name"
            aria-label="Search"
            className="col-md-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <br />
        <div className="row">
          <label className="col-md-2">Type:</label>
          <input
            type="text"
            placeholder="type"
            aria-label="Search"
            className="col-md-3"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <br />
        <div className="row">
          <label className="col-md-2">City:</label>
          <input
            type="text"
            placeholder="city"
            aria-label="Search"
            className="col-md-3"
            value={city}
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
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          />
        </div>
        <br />
        <div className="row">
          <label className="col-md-2">Address:</label>
          <input
            type="text"
            placeholder="address"
            aria-label="Search"
            className="col-md-3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <br />
        <div className="row">
          <label className="col-md-2">Postal Code:</label>
          <input
            type="text"
            placeholder="postal code"
            aria-label="Search"
            className="col-md-3"
            value={postal}
            onChange={(e) => setPostal(e.target.value)}
          />
        </div>
        <br />
        <div className="row">
          <label className="col-md-2">Contact:</label>
          <input
            type="text"
            placeholder="contact"
            aria-label="Search"
            className="col-md-3"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <br />
        <div className="row">
          <label className="col-md-2">Website:</label>
          <input
            type="text"
            placeholder="website"
            aria-label="Search"
            className="col-md-3"
            value={website}
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
      {showSuccess && (
        <div className="alert alert-success" role="alert">
          Form submitted successfully!
          <button type="button" className="close" onClick={handleCloseSuccess}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </>
  );
};

export default Add;
