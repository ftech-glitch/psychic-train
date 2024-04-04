import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Details.module.css";
import UpdateForm from "./UpdateForm";
import glass from "./glass.png";

const OverLay = (props) => {
  const [editedBrewery, setEditedBrewery] = useState({
    fields: { ...props.brewery },
  });
  const [editMode, setEditMode] = useState(false);

  // close modal
  const handleCloseModal = () => {
    props.setShowUpdateModal(false);
  };

  // handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBrewery((prevBrewery) => ({
      ...prevBrewery,
      fields: {
        ...prevBrewery.fields,
        [name]: value,
      },
    }));
  };

  // update brewery
  const handleSaveChanges = async () => {
    const res = await fetchData(
      "/api/brewery" + id,
      "PATCH",
      {
        name: name.current.value,
        type: type.current.value,
        city: city.current.value,
        state: province.current.value,
        address: address.current.value,
        postal: postal.current.value,
        contact: contact.current.value,
        website: website.current.value,
      }
    )


    try {
      const response = await fetch(
        `https://api.airtable.com/v0/appQPGY7SNCdqDtdV/Table%201`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer patxkA4uOl3Cyh9sV.adcda182ede1acc1b0a6684224f61b1b7d78439ac2f7376b6b09a554bdb8f675`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            records: [
              {
                id: props.brewery.id,
                fields: {
                  Name: editedBrewery.fields.name,
                  Type: editedBrewery.fields.brewery_type,
                  City: editedBrewery.fields.city,
                  State: editedBrewery.fields.state,
                  Address: editedBrewery.fields.street,
                  Postal: editedBrewery.fields.postal_code,
                  Contact: editedBrewery.fields.phone,
                  Website: editedBrewery.fields.website_url,
                },
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update brewery record");
      }

      // update local state or trigger a refresh of brewery data
      props.getBreweries();
      handleCloseModal();
    } catch (error) {
      console.error("Error updating brewery:", error);
    }
  };

  // delete brewery
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://api.airtable.com/v0/appQPGY7SNCdqDtdV/Table%201/${props.brewery.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer patxkA4uOl3Cyh9sV.adcda182ede1acc1b0a6684224f61b1b7d78439ac2f7376b6b09a554bdb8f675`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete brewery record");
      }
      props.getBreweries();
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting brewery:", error);
    }
  };

  // handle cancel edits
  const handleCancel = () => {
    setEditMode(false);
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
    if (props.brewery.phone) {
      return (
        <p className="modal-text">Phone: {formatNumber(props.brewery.phone)}</p>
      );
    }
    return <p className="modal-text">Phone: -</p>;
  };

  // handle type function
  const renderType = () => {
    if (props.brewery.brewery_type) {
      return <p className="modal-text">Type: {props.brewery.brewery_type}</p>;
    }
    return <p className="modal-text">Type: -</p>;
  };

  // handle address function
  const renderAddress = () => {
    if (props.brewery.street && props.brewery.postal_code) {
      return (
        <p className="modal-text">
          Address:{" "}
          <a
            href={`https://www.google.com/maps?q=${props.brewery.street},${props.brewery.postal_code}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.brewery.street}, {props.brewery.postal_code}
          </a>
        </p>
      );
    }
    return <p className="modal-text">Address: -</p>;
  };

  // handle website function
  const renderWebsite = () => {
    if (props.brewery.website_url) {
      return (
        <p className="modal-text">
          Website:{" "}
          <a
            href={props.brewery.website_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.brewery.website_url}
          </a>
        </p>
      );
    }
    return <p className="modal-text">Website: -</p>;
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        {/* edit modal*/}
        {editMode ? (
          <UpdateForm
            editedBrewery={editedBrewery}
            handleInputChange={handleInputChange}
            handleSaveChanges={handleSaveChanges}
            handleCancel={handleCancel}
          />
        ) : (
          // details modal
          <div className="row align-items-center">
            <div className="row align-items-center">
              <div className="col-md-3 text-center">
                <img src={glass} alt="glass" className="glass" />
              </div>
              <div className="col-md-6 text-center">
                <h5 className="random-brewery">{props.brewery.name}</h5>
              </div>
              <div className="col-md-3 text-center">
                <img src={glass} alt="glass" className="glass" />
              </div>
            </div>
            {renderType()}
            {renderAddress()}
            {renderPhoneNumber()}
            {renderWebsite()}
            <div className={styles.buttonGroup}>
              <button
                className={styles.modalButton}
                onClick={() => setEditMode(true)}
              >
                edit
              </button>
              <button className={styles.modalButton} onClick={handleDelete}>
                delete
              </button>
              <button className={styles.modalButton} onClick={handleCloseModal}>
                close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DetailsModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          brewery={props.brewery}
          setShowUpdateModal={props.setShowUpdateModal}
          getBreweries={props.getBreweries}
        ></OverLay>,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default DetailsModal;
