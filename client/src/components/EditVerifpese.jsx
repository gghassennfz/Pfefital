import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import "@fortawesome/fontawesome-free/css/all.css";
import { useReactToPrint } from "react-to-print";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

const Input = ({ index, value, name, onChange, isTitle = false }) => {
  if (isTitle)
    return (
      <div className="form-field1">
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

const Pese = () => {
  const printRef = useRef();
  const { id } = useParams();
  const [verification, setVerification] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [editedVerificationRow, setEditedVerificationRow] = useState();
  const [isEditMode, setIsEditMode] = useState(false);

  const getVerification = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3001/vpese/vpese/` + id)
      .then((res) => {
        setVerification(res.data.verification);
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
      .delete(`http://localhost:3001/vpese/vpese/${id}`)
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
    setEditedVerificationRow();
  };

  const handleEditVerification = () => {
    setIsLoading(true);
    axios
      .put(`http://localhost:3001/vpese/vpese/${id}`, editedVerificationRow)
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
    DV,
    RBT,
    Pfabrication,
    Ptransfert,
    Vpartage,
    VU,
    VP,
    Verifsacs,
    Nombreprep,
    Dateproo,
    DPF,
    LOT,
    Dp,
    DLC,
    activities,
  } = verification;

  return (
    <div className="hero">
      <div className="appc">
        <div className="work">
          <h1 className="titre1">
            Affichage Verification Des Paniers De Pese :
          </h1>
          <button className="imprimer" onClick={handlePrint}>
            <FontAwesomeIcon icon={faPrint} /> Print
          </button>

          {!isEditMode ? (
            <button onClick={() => handleEditedVerificationRow(verification)}>
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

          <div className="print-page" ref={printRef}>
            <div className="form">
              <div className="form-field1">
                <label>Date de Verification :</label>
                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.DV}
                    name="DV"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                  DV
                )}
              </div>
              <div className="form-field1">
                <label>Reference de Bon de Transfert :</label>
                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.RBT}
                    name="RBT"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                  RBT
                )}
              </div>
              <div className="form-field1">
                <label>
                  Presence de tous les ingredients par rapport au fiche
                  fabrication :
                </label>
                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.Pfabrication}
                    name="Pfabrication"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                  Pfabrication
                )}
              </div>
              <div className="form-field1">
                <label>
                  Presence de tous les ingedients par rapport au bon de
                  transfert :
                </label>
                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.Ptransfert}
                    name="Ptransfert"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                  Ptransfert
                )}
              </div>
              <div className="form-field">
                <label>V partage :</label>
                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.Vpartage}
                    name="Vpartage"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                  Vpartage
                )}
              </div>
              <div className="form-field1">
                <label>Version utilise :</label>
                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.VU}
                    name="VU"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                  VU
                )}
              </div>
              <div className="form-field1">
                <label>Version partage :</label>
                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.VP}
                    name="VP"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                  VP
                )}
              </div>
              <div className="form-field1">
                <label>verification sacs gelule vracs :</label>

                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.Verifsacs}
                    name="Verifsacs"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                  Verifsacs
                )}
              </div>
              <div className="form-field1">
                <label>Nombre de préparation :</label>

                {isEditMode ? (
                  <Input
                    value={editedVerificationRow.Nombreprep}
                    name="Nombreprep"
                    onChange={handleEditedVerifTitle}
                    isTitle={true}
                  />
                ) : (
                  Nombreprep
                )}
              </div>
              <div className="form-field1">
                <label>
                  date de production:
                  
                </label>
                  {isEditMode ? (
                    <Input
                      value={editedVerificationRow.Dateproo}
                      name="Dateproo"
                      onChange={handleEditedVerifTitle}
                      isTitle={true}
                    />
                  ) : (
                    Dateproo
                  )}
              </div>
              <div className="form-field1">
                <label>
                  Date de Verification :
                </label>
                  {isEditMode ? (
                    <Input
                      value={editedVerificationRow.DV}
                      name="DV"
                      onChange={handleEditedVerifTitle}
                      isTitle={true}
                    />
                  ) : (
                    DV
                  )}
              </div>
              <div className="form-field1">
                <label>
                  Designation PF :
                  
                </label>
                  {isEditMode ? (
                    <Input
                      value={editedVerificationRow.DPF}
                      name="DPF"
                      onChange={handleEditedVerifTitle}
                      isTitle={true}
                    />
                  ) : (
                    DPF
                  )}
              </div>
              <div className="form-field1">
                <label>
                  Lot :
                  
                </label>
                  {isEditMode ? (
                    <Input
                      value={editedVerificationRow.LOT}
                      name="LOT"
                      onChange={handleEditedVerifTitle}
                      isTitle={true}
                    />
                  ) : (
                    LOT
                  )}
              </div>
              <div className="form-field1">
                <label>
                  DP :
                  
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
              <div className="form-field1">
                <label>
                  DLC :
                </label>
                  {isEditMode ? (
                    <Input
                      value={editedVerificationRow.DLC}
                      name="DLC"
                      onChange={handleEditedVerifTitle}
                      isTitle={true}
                    />
                  ) : (
                    DLC
                  )}
              </div>
              <br/>
              {/* Add similar input fields for other verification data */}
            </div>

            <table>
              <thead>
                <tr>
                  <th>Liste des Matières Premières</th>
                  <th>Lot</th>
                  <th>DLC</th>
                  <th>Quantité</th>
                  <th>Etanchéité</th>
                  <th>Lot + DLC</th>
                  <th>Activite</th>
                </tr>
              </thead>
              <tbody>
                {activities?.map(
                  (
                    { lmp, lot, dlc, quantite, etanchite, fournisseur },
                    index
                  ) => (
                    <tr key={index}>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={editedVerificationRow.activities[index].lmp}
                            name="lmp"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          lmp
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={editedVerificationRow.activities[index].lot}
                            name="lot"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          lot
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={editedVerificationRow.activities[index].dlc}
                            name="dlc"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          dlc
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index].quantite
                            }
                            name="quantite"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          quantite
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index].etanchite
                            }
                            name="etanchite"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          etanchite
                        )}
                      </td>
                      <td>
                        {isEditMode ? (
                          <Input
                            index={index}
                            value={
                              editedVerificationRow.activities[index]
                                .fournisseur
                            }
                            name="fournisseur"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          fournisseur
                        )}
                      </td>

                      <td>
                        {isEditMode && (
                          <button
                            className="btnDeletee"
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

export default Pese;
