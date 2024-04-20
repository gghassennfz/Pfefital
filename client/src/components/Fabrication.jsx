import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EditVerifFabrication from "./EditVerifFabrication";
import Swal from "sweetalert2";

const Input = ({ value, name, onChange }) => {
  return (
    <div className="form-field">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
      />
    </div>
  );
};

const Fabrication = () => {
  const [verifications, setVerifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editedVerificationId, setEditedVerificationId] = useState();
  const [editedVerificationRow, setEditedVerificationRow] = useState();

  const getVerifications = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:3001/vfabrication/vfabrication")
      .then((res) => {
        setVerifications(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getVerifications();
  }, []);

   // Function to handle deletion of a verification
   const handleDelete = (id) => {
    // Display confirmation popup
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
      // If user confirms deletion
      if (result.isConfirmed) {
        // Send delete request to the server
        axios
          .delete(`http://localhost:3001/vfabrication/vfabrication/${id}`)
          .then((res) => {
            if (res.data.deleted) {
              // If deletion is successful, fetch updated verifications
              getVerifications();
              // Show success toast
              toast.success("Verification deleted successfully", {
                position: "bottom-right",
              });
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const handleEditedVerificationRow = (verification) => {
    setEditedVerificationRow(verification);
  };

  const handleEditedVerifCell = (name, value) => {
    setEditedVerificationRow((row) => ({ ...row, [name]: value }));
  };

  const handleCancelEdit = () => {
    setEditedVerificationId();
    setEditedVerificationRow();
  };

  const handleEditVerification = () => {
    setIsLoading(true);

    axios
      .put(
        `http://localhost:3001/vfabrication/vfabrication/${editedVerificationId}`,
        editedVerificationRow
      )
      .then(() => {
        getVerifications();
        setEditedVerificationId();
        setEditedVerificationRow();
        toast(`Modifier`, {
          type: "success",
          position: "bottom-right",
        });
      })
      .catch((err) => console.log(err));
  };

  if (isLoading)
    return (
      <div
        style={{
          width: "100%",
          height: "50vh",
          textAlign: "center",
          paddingTop: "40vh",
        }}
      >
        <p>Loading ...</p>
      </div>
    );

  console.log({ verifications });

  return (
   <div className="hero">
     <div className="appc">
     <div className="work">
     <EditVerifFabrication verifications={verifications} handleDelete={handleDelete} />


      
    </div>
     </div>
   </div>
  );
};

export default Fabrication;
