import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

import "@fortawesome/fontawesome-free/css/all.css";

const Input = ({ index, value, name, onChange, isTitle = false }) => {
  if (isTitle)
    return (
      <div className="form-field">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
        />
      </div>
    );

  return (
    <div className="form-field">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(index, name, e.target.value)}
      />
    </div>
  );
};

const Nettoyage = () => {
  const printRef = useRef();
  const { id } = useParams();
  const [verification, setVerification] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editedVerificationRow, setEditedVerificationRow] = useState();
  const [isEditMode, setIsEditMode] = useState(false);

  console.log({ verification });

  const getVerification = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:3001/vnettoyage/vnettoyage/" + id)
      .then((res) => {
        setVerification({ ...res.data.verification });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getVerification();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/vnettoyage/vnettoyage/${id}`)
      .then((res) => {
        if (res.data.deleted) {
          getVerification();
          toast(`Supprimer`, {
            type: "success",
            position: "bottom-right",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteRow = (index) => {
    const activities = editedVerificationRow.activities;

    // delete the index entity herez ..........
    activities.splice(index, 1);

    setEditedVerificationRow((row) => ({ ...row, activities }));
  };

  const handleEditedVerificationRow = (verification) => {
    setIsEditMode(true);
    setEditedVerificationRow({ ...verification });
  };

  const handleEditedVerifTitle = (name, value) => {
    setEditedVerificationRow((row) => ({ ...row, [name]: value }));
  };

  const handleEditedVerifCell = (index, name, value) => {
    console.log({ index, name, value });

    const activities = editedVerificationRow.activities;
    activities[index][name] = value;
    setEditedVerificationRow((row) => ({ ...row, activities }));
  };
  const handleCancelEdit = () => {
    setIsEditMode(false);
    // Fetch the original verification data again to reset editedVerificationRow
    getVerification();
    toast(`La Modification annulé`, {
      type: "info",
      position: "bottom-right",
    });
  };

  const handleEditVerification = () => {
    setIsLoading(true);

    axios
      .put(
        `http://localhost:3001/vnettoyage/vnettoyage/${id}`,
        editedVerificationRow
      )
      .then(() => {
        getVerification();
        setIsEditMode(false);
        setEditedVerificationRow();
        toast(`Modifier`, {
          type: "success",
          position: "bottom-right",
        });
      })
      .catch((err) => console.log(err));
  };
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

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

  const { Produit, Lot, Dp, activities } = verification;

  console.log({ activities });

  return (
    <div className="hero">
      <div className="appc">
        <div className="work">
          <h1 className="titre1">Affichage Verification de Nettoyage :</h1>

          <div>
            {!isEditMode ? (
              <button
                onClick={() => {
                  handleEditedVerificationRow(verification);
                }}
              >
                <i className="fas fa-edit"></i> Modifier
              </button>
            ) : (
              <div>
                <button className="button-link1" onClick={handleCancelEdit}>
                  <i className="fas fa-cancel"></i> Annuler modification
                </button>
                <button onClick={handleEditVerification}>
                  <i className="fas fa-save"></i> Enregistrer modification
                </button>
              </div>
            )}
          </div>
          <button className="imprimer" onClick={handlePrint}>
                <FontAwesomeIcon icon={faPrint} /> Print
              </button>
              
          <div className="print-page" ref={printRef}>
          <div >
            <div className="form-row">
              <div className="form-field">
                <label>
                  Produit à travailler :
                </label>
                {isEditMode ? (
                    <Input
                      value={editedVerificationRow.Produit}
                      name="Produit"
                      onChange={handleEditedVerifTitle}
                      isTitle={true}
                    />
                  ) : (
                    Produit
                  )}
              </div>
              <div className="form-field">
                <label>
                  Numéro de lot :
                </label>
                {isEditMode ? (
                    <Input
                      value={editedVerificationRow.Lot}
                      name="Lot"
                      onChange={handleEditedVerifTitle}
                      isTitle={true}
                    />
                  ) : (
                    Lot
                  )}
              </div>
              <div className="form-field">
                <label>
                  Date de production :
                </label>
                {isEditMode ? (
                    <Input
                      value={editedVerificationRow.Dp}
                      name="Dp"
                      onChange={handleEditedVerifTitle}
                      isTitle={true}
                    />
                  ) : (
                    Dp
                  )}
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Machine / Equipement</th>
                  <th>
                    Produit travaillé sur machine avant nettoyage
                    <br />
                    (N° Lot et Date de production)
                  </th>
                  <th>Référence</th>
                  <th>
                    Nettoyage et désinfection
                    <br />
                    (Date,Heure,Nom et Prenom,Visa)
                  </th>
                  <th>
                    Rincage / essuyage (Date,Heure début,Heure fin,Nom et prenom
                    de l'operateur,Visa)
                  </th>
                  <th>
                    Validation Rinçage avant production
                    <br />
                    (Nom et prenom de TCQ Visa)
                  </th>
                  <th>
                    Verification conformité du materiel avant utilisation <br />{" "}
                    (Date Nom & Prenom Visa)
                  </th>
                  <th>Test Allergéne (Allergène,Non Allergène)</th>
                  <th>
                    Validation test Par chef labo/son intérim (Nom & Prenom/
                    Visa)
                  </th>
                  <th>Observation </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities?.map(
                  (
                    {
                      machine,
                      produit,
                      reference,
                      nettDesinfection,
                      rincage,
                      validationRinsage,
                      verificationConformite,
                      testAllergene,
                      validationTest,
                      observation,
                    },
                    index
                  ) => (
                    <tr key={index}>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index].machine
                            }
                            name="machine"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          machine
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index].produit
                            }
                            name="produit"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          produit
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index].reference
                            }
                            name="reference"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          reference
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index]
                                .nettDesinfection
                            }
                            name="nettDesinfection"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          nettDesinfection
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index].rincage
                            }
                            name="rincage"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          rincage
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index]
                                .validationRinsage
                            }
                            name="validationRinsage"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          validationRinsage
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index]
                                .verificationConformite
                            }
                            name="verificationConformite"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          verificationConformite
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index]
                                .testAllergene
                            }
                            name="testAllergene"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          testAllergene
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index]
                                .validationTest
                            }
                            name="validationTest"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          validationTest
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index]
                                .observation
                            }
                            name="observation"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          observation
                        )}
                      </td>
                      <td>
                        {isEditMode && (
                          <button
                            className="btnDelete"
                            onClick={() => handleDeleteRow(index)}
                          >
                            {" "}
                            <FaTrash />
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nettoyage;
