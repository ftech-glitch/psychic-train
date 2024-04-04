import React from "react";
import styles from "./Details.module.css";

const UpdateForm = ({
  brewery,
  handleInputChange,
  handleSaveChanges,
  handleCancel,
}) => {
  console.log(brewery);

  return (
    <div>
      <br />
      <div className="row">
        <p className="modal-text col-md-2">Name: </p>
        <input
          className="col-md-6"
          type="text"
          defaultValue={brewery.Name}
          onChange={handleInputChange}
        />
      </div>
      <div className="row">
        <p className="modal-text col-md-2">Type: </p>
        <input
          className="col-md-6"
          type="text"
          defaultValue={brewery.Type}
          onChange={handleInputChange}
        />
      </div>
      <div className="row">
        <p className="modal-text col-md-2">City: </p>
        <input
          className="col-md-6"
          type="text"
          defaultValue={brewery.City}
          onChange={handleInputChange}
        />
      </div>
      <div className="row">
        <p className="modal-text col-md-2">State: </p>
        <input
          className="col-md-6"
          type="text"
          defaultValue={brewery.State}
          onChange={handleInputChange}
        />
      </div>
      <div className="row">
        <p className="modal-text col-md-2">Address: </p>
        <input
          className="col-md-6"
          type="text"
          defaultValue={brewery.Address}
          onChange={handleInputChange}
        />
      </div>
      <div className="row">
        <p className="modal-text col-md-2">Postal code: </p>
        <input
          className="col-md-6"
          type="text"
          defaultValue={brewery.Postal}
          onChange={handleInputChange}
        />
      </div>
      <div className="row">
        <p className="modal-text col-md-2">Phone: </p>
        <input
          className="col-md-6"
          type="text"
          defaultValue={brewery.Contact}
          onChange={handleInputChange}
        />
      </div>
      <div className="row">
        <p className="modal-text col-md-2">Website: </p>
        <input
          className="col-md-6"
          type="text"
          defaultValue={brewery.Website}
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
