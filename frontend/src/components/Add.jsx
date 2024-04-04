import React, { useRef, useFetch, useContext } from "react";
import UserContext from "../context/user";

const Add = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const nameRef = useRef("");
  const typeRef = useRef("");
  const addressRef = useRef("");
  const postalRef = useRef("");
  const cityRef = useRef("");
  const provinceRef = useRef("");
  const contactRef = useRef("");
  const websiteRef = useRef("");

  // add new brewery
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetchData(
      "api/brewery",
      "PUT",
      {
        name: nameRef.current.value,
        type: typeRef.current.value,
        city: cityRef.current.value,
        state: provinceRef.current.value,
        address: addressRef.current.value,
        postal: postalRef.current.value,
        contact: contactRef.current.value,
        website: websiteRef.current.value,
      },
      userCtx.accessToken
    );

    if (res.ok) {
      getBreweries();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
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
