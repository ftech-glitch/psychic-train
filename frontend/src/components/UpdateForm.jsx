import React from "react";
import styles from "./Details.module.css";

const UpdateForm = ({
  editedBrewery,
  handleInputChange,
  handleSaveChanges,
  handleCancel,
}) => {
  return (
    <div>
      <br />
      <div className="row">
        <p className="modal-text col-md-2">Name: </p>
        <input
          className="col-md-6"
          type="text"
          name="name"
          value={editedBrewery.fields.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="row">
        <p className="modal-text col-md-2">Type: </p>
        <input
          className="col-md-6"
          type="text"
          name="brewery_type"
          value={editedBrewery.fields.brewery_type}
          onChange={handleInputChange}
        />
      </div>
      <div className="row">
        <p className="modal-text col-md-2">City: </p>
        <input
          className="col-md-6"
          type="text"
          name="city"
          value={editedBrewery.fields.city}
          onChange={handleInputChange}
        />
      </div>
      <div className="row">
        <p className="modal-text col-md-2">State: </p>
        <input
          className="col-md-6"
          type="text"
          name="state"
          value={editedBrewery.fields.state}
          onChange={handleInputChange}
        />
      </div>
      <div className="row">
        <p className="modal-text col-md-2">Address: </p>
        <input
          className="col-md-6"
          type="text"
          name="street"
          value={editedBrewery.fields.street}
          onChange={handleInputChange}
        />
      </div>
      <div className="row">
        <p className="modal-text col-md-2">Postal code: </p>
        <input
          className="col-md-6"
          type="text"
          name="postal_code"
          value={editedBrewery.fields.postal_code}
          onChange={handleInputChange}
        />
      </div>
      <div className="row">
        <p className="modal-text col-md-2">Phone: </p>
        <input
          className="col-md-6"
          type="text"
          name="phone"
          value={editedBrewery.fields.phone}
          onChange={handleInputChange}
        />
      </div>
      <div className="row">
        <p className="modal-text col-md-2">Website: </p>
        <input
          className="col-md-6"
          type="text"
          name="website_url"
          value={editedBrewery.fields.website_url}
          onChange={handleInputChange}
        />
      </div>
      <br />
      <div className={styles.buttonGroup}>
        <button className={styles.modalButton} onClick={handleSaveChanges}>
          save changes
        </button>
        <button className={styles.modalButton} onClick={handleCancel}>
          cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateForm;
