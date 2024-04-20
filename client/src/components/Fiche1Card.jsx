import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios
import Swal from "sweetalert2";

const Fiche1Card = ({ fiche1, role }) => {
  const { Mp, Lot, DLC, Quantite, Etanchite, Etiquette, statut, _id } = fiche1; // Destructure _id from fiche1
  const [status, setStatus] = useState(statut);

  const handleStatut = (e) => {
    e.preventDefault();
    const newStatus = status === "Non Verifier" ? "Verifier" : "Non Verifier";
    axios
      .put(`http://localhost:3001/fiche1/fiche1/${_id}`, { statut: newStatus })
      .then((res) => {
        if (res.data.updated) {
          setStatus(newStatus);
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Etes-vous sûr de supprimer?",
      text: "Vous ne pourrez pas récupérer cette fiche !",
      icon: "warning",
      cancelButtonText: "Annulé",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimez-le !",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3001/fiche1/fiche1/${_id}`)
          .then((res) => {
            if (res.data.deleted) {
              Swal.fire(
                "Supprimé !",
                "Votre fiche a été supprimée.",
                "success"
              ).then(() => {
                window.location.reload(); // Refresh the page
              });
            } else {
              console.log(res);
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <div className="fiche1-card">
      <div className="fiche1-details">
        <p>Matière Première: {Mp}</p>
        <p>Numéro Lot: {Lot}</p>
        <p>Date Limite Consommation: {DLC}</p>
        <p>Quantité: {Quantite}</p>
        <p>Étanchéité et Sécurité des Bouchons: {Etanchite}</p>
        <p>Étiquette Fournisseur: {Etiquette}</p>
        <p>STATUT: {status}</p>
      </div>
      <div className="fiche1-actions">
        <button>
          <Link to={`/fiche1/${_id}`} className="btn-link">
            Edit
          </Link>
        </button>
        <button onClick={handleDelete} className="btn-link1">
          Delete
        </button>
      </div>
      <div className="statu">
        {role === "validator" && (
          <button
            className="sta"
            type="button"
            onClick={handleStatut}
            style={{
              backgroundColor:
                status === "Verifier"
                  ? "green"
                  : status === "Non Verifier"
                  ? "red"
                  : "gray",
            }}
          >
            {status === "Verifier" ? "Verifier" : "Non Verifier"}
          </button>
        )}
        {role !== "validator" && (
          <button
            className="sta"
            type="button"
            disabled
            title="You are not authorized to change the status"
            style={{
              backgroundColor:
                status === "Verifier"
                  ? "green"
                  : status === "Non Verifier"
                  ? "red"
                  : "gray",
            }}
          >
            {status}
          </button>
        )}
      </div>
    </div>
  );
};

export default Fiche1Card;
