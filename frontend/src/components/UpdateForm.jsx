import React from "react";
import styles from "./Details.module.css";

const UpdateForm = ({
  brewery,
  handleInputChange,
  handleSaveChanges,
  handleCancel,
  editedBrewery,
  setEditedBrewery,
}) => {
  return (
    <div>
      <br />
      <div className="row">
        <p className="modal-text col-md-2">Name: </p>
        <input
          className="col-md-6"
          type="text"
          defaultValue={editedBrewery.Name}
          onChange={(e) => handleInputChange("Name", e.target.value)}
        />
      </div>
      <div className="row">
        <p className="modal-text col-md-2">Type: </p>
        <input
          className="col-md-6"
          type="text"
          defaultValue={editedBrewery.Type}
          onChange={(e) => handleInputChange("Type", e.target.value)}
        />
      </div>
      <div className="row">
        <p className="modal-text col-md-2">City: </p>
        <input
          className="col-md-6"
          type="text"
          defaultValue={editedBrewery.City}
          onChange={(e) => handleInputChange("City", e.target.value)}
        />
      </div>
      <div className="row">
        <p className="modal-text col-md-2">State: </p>
        <input
          className="col-md-6"
          type="text"
          defaultValue={editedBrewery.State}
          onChange={(e) => handleInputChange("State", e.target.value)}
        />
      </div>
      <div className="row">
        <p className="modal-text col-md-2">Address: </p>
        <input
          className="col-md-6"
          type="text"
          defaultValue={editedBrewery.Address}
          onChange={(e) => handleInputChange("Address", e.target.value)}
        />
      </div>
      <div className="row">
        <p className="modal-text col-md-2">Postal code: </p>
        <input
          className="col-md-6"
          type="text"
          defaultValue={editedBrewery.Postal}
          onChange={(e) => handleInputChange("Postal", e.target.value)}
        />
      </div>
      <div className="row">
        <p className="modal-text col-md-2">Phone: </p>
        <input
          className="col-md-6"
          type="text"
          defaultValue={editedBrewery.Contact}
          onChange={(e) => handleInputChange("Contact", e.target.value)}
        />
      </div>
      <div className="row">
        <p className="modal-text col-md-2">Website: </p>
        <input
          className="col-md-6"
          type="text"
          defaultValue={editedBrewery.Website}
          onChange={(e) => handleInputChange("Website", e.target.value)}
        />
      </div>
      <br />
      <div className={styles.buttonGroup}>
        <button
          className={styles.modalButton}
          onClick={() => {
            console.log("Onclick update", editedBrewery);
            handleSaveChanges(brewery._id, editedBrewery);
          }}
        >
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
