import React, { useState, useRef, useContext } from "react";
import ReactDOM from "react-dom";
import styles from "./Details.module.css";
import UpdateForm from "./UpdateForm";
import glass from "./glass.png";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const OverLay = ({ fetchBreweries, setShowUpdateModal, brewery }) => {
  const [editMode, setEditMode] = useState(false);
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [editedBrewery, setEditedBrewery] = useState({});

  // close modal
  const handleCloseModal = () => {
    setShowUpdateModal(false);
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
      "/api/brewery" + brewery.id,
      "PATCH",
      editedBrewery,
      userCtx.accessToken
    );

    if (res.ok) {
      console.log("update brewery");
      // update local state or trigger a refresh of brewery data
      fetchBreweries();
      handleCloseModal();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  // delete brewery
  const handleDelete = async () => {
    const res = await fetchData(
      `/api/brewery/${brewery.id}`,
      "DELETE",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      fetchBreweries();
      handleCloseModal();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  // handle cancel edits
  const handleCancel = () => {
    setEditMode(false);
  };

  // // format phone number
  // const formatNumber = (phoneStr) => {
  //   let cleaned = ("", phoneStr).replace(/\D/g, "");

  //   let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  //   if (match) {
  //     return "(" + match[1] + ") " + match[2] + "-" + match[3];
  //   }

  //   return null;
  // };

  // handle phone function
  const renderPhoneNumber = () => {
    if (brewery.Contact) {
      return <p className="modal-text">Phone: {brewery.Contact}</p>;
    }
    return <p className="modal-text">Phone: -</p>;
  };

  // handle name function
  const renderName = () => {
    if (brewery.Name) {
      return <p className="modal-text">Name: {brewery.Name}</p>;
    }
    return <p className="modal-text">Name: -</p>;
  };

  // handle type function
  const renderType = () => {
    if (brewery.Type) {
      return <p className="modal-text">Type: {brewery.Type}</p>;
    }
    return <p className="modal-text">Type: -</p>;
  };

  // handle address function
  const renderAddress = () => {
    if (brewery.Address && brewery.Postal) {
      return (
        <p className="modal-text">
          Address:{" "}
          <a
            href={`https://www.google.com/maps?q=${brewery.Address},${brewery.Postal}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {brewery.Address}, {brewery.Postal}
          </a>
        </p>
      );
    }
    return <p className="modal-text">Address: -</p>;
  };

  // handle website function
  const renderWebsite = () => {
    if (brewery.Website) {
      return (
        <p className="modal-text">
          Website:{" "}
          <a href={brewery.Website} target="_blank" rel="noopener noreferrer">
            {brewery.Website}
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
            brewery={brewery}
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
                <h5 className="random-brewery">{brewery.name}</h5>
              </div>
              <div className="col-md-3 text-center">
                <img src={glass} alt="glass" className="glass" />
              </div>
            </div>
            {renderName()}
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

const DetailsModal = ({ fetchBreweries, brewery, setShowUpdateModal }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          fetchBreweries={fetchBreweries}
          brewery={brewery}
          setShowUpdateModal={setShowUpdateModal}
        ></OverLay>,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default DetailsModal;
