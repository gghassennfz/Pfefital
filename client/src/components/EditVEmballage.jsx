import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";

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

const EditVemballage = () => {
  const printRef = useRef();
  const { id } = useParams();
  const [verification, setVerification] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [editedVerificationRow, setEditedVerificationRow] = useState();
  const [isEditMode, setIsEditMode] = useState(false);

  const getVerification = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:3001/vemballage/vemballage/" + id)
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
      .delete(`http://localhost:3001/vemballage/vemballage/${id}`)
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
        `http://localhost:3001/vemballage/vemballage/${id}`,
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
  const {
    lot,
    dlc,
    date,
    action,
    chef,
    programme,
    validation,
    activities,
  } = verification;

  console.log({ activities });

  return (
    <div className="hero">
      <div className="appc">
        <div className="work">
          <h1 className="titre1">Affichage Verification de Fabrication :</h1>

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
            <div className="form-row">
              <div className="form-field">
                <label>lot :</label>
                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.lot}
                    name="lot"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                    lot
                )}
              </div>

              <div className="form-field">
                <label>dlc :</label>
                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.dlc}
                    name="dlc"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                    dlc
                )}
              </div>
              <div className="form-field">
                <label>date :</label>
                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.date}
                    name="date"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                    date
                )}
              </div>
              <div className="form-field">
                <label>action :</label>
                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.action}
                    name="action"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                    action
                )}
              </div>
              <div className="form-field">
                <label>chef:</label>
                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.chef}
                    name="chef"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                    chef
                )}
              </div>
              <div className="form-field">
                <label>programme :</label>
                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.programme}
                    name="programme"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                    programme
                )}
              </div>
              <div className="form-field">
                <label>validation:</label>
                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.validation}
                    name="validation"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                    validation
                )}
              </div>
            </div>
            <table>
              <thead>
                <tr>
                <th>Date et Heure</th>
                <th>Article</th>
                <th>Version/Reference</th>
                <th>Operation de datation</th>
                <th>Lot/Dp/Dlc/Code d'emballage</th>
                <th>Qualité de l'article</th>
                <th>Quantité prélevée</th>
                <th>Quantité non conforme</th>
                <th>Decision</th>
                <th>Responsable de validation Controle Qualité</th>
                <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities?.map(
                  (
                    {
                      dateheured,
                      dateheureh,
                      article,
                      version,
                      datation,
                      lddc,
                      qualitearticle,
                      prelevee,
                      nonconfirme,
                      decision,
                      controle,
                    },
                    index
                  ) => (
                    <tr key={index}>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index].dateheured // Optional chaining to handle potential undefined value
                            }
                            name="dateheured"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          dateheured
                        )}
                        <br/>
                         {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index].dateheureh // Optional chaining to handle potential undefined value
                            }
                            name="dateheureh"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          dateheureh
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index].article // Optional chaining to handle potential undefined value
                            }
                            name="article"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          article
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index].version
                            }
                            name="version"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          version
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={editedVerificationRow.activities[index].datation}
                            name="datation"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          datation
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index].lddc
                            }
                            name="lddc"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          lddc
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index].qualitearticle
                            }
                            name="qualitearticle"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          qualitearticle
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index].prelevee
                            }
                            name="prelevee"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          prelevee
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index].nonconfirme
                            }
                            name="nonconfirme"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          nonconfirme
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index].decision
                            }
                            name="decision"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          decision
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index].controle
                            }
                            name="controle"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          controle
                        )}
                      </td>

                      <td>
                        {isEditMode && (
                          <button
                            className="btnDelete"
                            onClick={() => handleDeleteRow(index)}
                          >
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
  );
};

export default EditVemballage;
