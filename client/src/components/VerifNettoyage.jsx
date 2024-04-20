import axios from "axios";
import React, { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { FaPlus, FaSave, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/VerifNettoyage.css";

function VerificationNettoyage() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    {
      machine: "",
      produit: "",
      reference: "",
      nettDesinfection: "",
      rincage: "",
      validationRinsage: "",
      verificationConformite: "",
      testAllergene: "",
      validationTest: "",
      observation: "",
    },
  ]);

  const [Produit, setProduit] = useState("");
  const [Lot, setLot] = useState("");
  const [Dp, setDateProduction] = useState(new Date()); // Karim
  console.log(Datetime);

  const addRow = () => {
    setRows([
      ...rows,
      {
        machine: "",
        produit: "",
        reference: "",
        nettDesinfection: "",
        rincage: "",
        validationRinsage: "",
        verificationConformite: "",
        testAllergene: "",
        validationTest: "",
        observation: "",
      },
    ]);
  };
  const deleteRow = (indexToDelete) => {
    const updatedRows = rows.filter((row, index) => index !== indexToDelete);
    setRows(updatedRows);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
  };

  console.log({ rows });

  const saveData = () => {
    axios
      .post("http://localhost:3001/vnettoyage/add", {
        Produit,
        Lot,
        Dp,
        activities: rows,
      })
      .then((response) => {
        console.log("Data saved successfully:", response.data);
        toast(`Les Donneés Sont Sauvegarder`, {
          type: "success",
          position: "bottom-right",
        });
        navigate("/nettoyage");
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  return (
    <div className="hero">
      
      <div className="appc">
        <div className="work">
          <h1 className="titre1">Formulaire Verification de Nettoyage :</h1>
          <div className="form-row">
            <div className="form-field">
              <label>Produit à travailler :</label>
              <input
                type="text"
                name="produit"
                onChange={(e) => setProduit(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>Numéro de lot :</label>
              <input
                type="text"
                name="lot"
                onChange={(e) => setLot(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>Date de production :</label>
              <Datetime
                selected={Dp}
                onChange={(date) => setDateProduction(date)}
                inputProps={{ readOnly: false }}
                dateFormat="YYYY-MM-DD"
              />
            </div>
          </div>
          <table className="tableP">
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
                  Validation test Par chef labo/son intérim (Nom & Prenom/ Visa)
                </th>
                <th>Observation </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>
                    <textarea
                      type="text"
                      name="machine"
                      value={row.machine}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <textarea
                      type="text"
                      name="produit"
                      value={row.produit}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <textarea
                      type="text"
                      name="reference"
                      value={row.reference}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <textarea
                      type="text"
                      name="nettDesinfection"
                      value={row.nettDesinfection}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <textarea
                      type="text"
                      name="rincage"
                      value={row.rincage}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <textarea
                      type="text"
                      name="validationRinsage"
                      value={row.validationRinsage}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <textarea
                      type="text"
                      name="verificationConformite"
                      value={row.verificationConformite}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <div className="radio-container">
                      <label>
                        <input
                          type="radio"
                          name={`testAllergene_${index}`}
                          value="Allergene"
                          checked={row.testAllergene === "Allergene"}
                          onChange={(e) =>
                            handleInputChange(index, {
                              target: {
                                name: "testAllergene",
                                value: "Allergene",
                              },
                            })
                          }
                        />
                        A
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={`testAllergene_${index}`}
                          value="Non Allergene"
                          checked={row.testAllergene === "Non Allergene"}
                          onChange={(e) =>
                            handleInputChange(index, {
                              target: {
                                name: "testAllergene",
                                value: "Non Allergene",
                              },
                            })
                          }
                        />
                        NA
                      </label>
                    </div>
                  </td>
                  <td>
                    <textarea
                      type="text"
                      name="validationTest"
                      value={row.validationTest}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <textarea
                      type="text"
                      name="observation"
                      value={row.observation}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <button
                      className="btnDeletee"
                      onClick={() => deleteRow(index)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="action-btn" onClick={addRow}>
            <FaPlus /> Ajouter une ligne
          </button>
          <button className="action-btn2" onClick={saveData}>
            <FaSave /> Sauvgarder
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerificationNettoyage;
