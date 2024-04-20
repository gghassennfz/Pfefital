import axios from "axios";
import React, { useState } from "react";
import { FaPlus, FaSave, FaTrash } from "react-icons/fa";

function VerificationF() {
  const [rows, setRows] = useState([
    {
      heure: "",
      cuve: "",
      flacon: "",
      temp: "",
      changement: "",
      gouttes: "",
      volume: "",
      validation: "",
    },
  ]);
  const [productionRetour, setProductionRetour] = useState("");
  const [date, setDate] = useState("");
  const [designation, setDesignation] = useState("");
  const [lot, setLot] = useState("");
  const [nature, setNature] = useState("");
  const [vitesse, setVitesse] = useState("");
  const [preparation, setPreparation] = useState(""); // Remove this line since `preparation` is already declared

  const addRow = () => {
    setRows([
      ...rows,
      {
        heure: "",
        cuve: "",
        flacon: "",
        temp: "",
        changement: "",
        gouttes: "",
        volume: "",
        validation: "",
      },
    ]);
  };
  const saveData = () => {
    axios
      .post("http://localhost:3001/vfabrication/add", {
        productionRetour,
        date,
        designation,
        lot,
        nature,
        vitesse,
        preparation,
        activities: rows,
      })
      .then((response) => {
        console.log("Data saved successfully:", response.data);
        toast(`Les Donneés Sont Sauvegarder`, {
          type: "success",
          position: "bottom-right",
        });
        navigate("/ne");
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
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

  const handleRadioChange = (value) => {
    setProductionRetour(value);
  };
  
  return (
    <div className="hero">
      <div className="appc">
        <div className="work">
          <h1 className="titre1">
            Formulaire fabrication et controle du produit semi fini liquide :
          </h1>

          
          <div className="form-field">
  <label>
    Production
    <input
      type="radio"
      name="proRetour"
      value="Production"
      onChange={() => handleRadioChange("Production")}
    />
  </label>
  <label>
    Retour
    <input
      type="radio"
      name="proRetour"
      value="Retour"
      onChange={() => handleRadioChange("Retour")}
    />
  </label>
</div>



          <div className="fom-ow">
            <div className="form-field">
              <label>Date :</label>
              <input
                type="date"
                name="date"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>Designation :</label>
              <input
                type="text"
                name="designation"
                onChange={(e) => setDesignation(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>Lot :</label>
              <input
                type="text"
                name="lot"
                onChange={(e) => setLot(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>Nature de flacon :</label>
              <input
                type="text"
                name="nature"
                onChange={(e) => setNature(e.target.value)}
              />
            </div>
          </div>
          <div className="form-field">
            <label>Vitesse affichée :</label>
            <input
              type="text"
              name="vitesse"
              onChange={(e) => setVitesse(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label>Validation conducteur machines</label>
            <input
              type="text"
              name="preparation"
              onChange={(e) => setPreparation(e.target.value)}
            />
          </div>
         
          <table className="tableP">
            <thead>
              <tr>
                <th>Heure</th>
                <th>N° Cuve</th>
                <th>Propreté flacon</th>
                <th>Température de rincage</th>
                <th>Changement d'eau</th>
                <th>Presence de gouttes d'eau</th>
                <th>Volume par flacon (ml)</th>
                <th>Responsabilité Validation</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="time"
                      name="heure"
                      value={row.heure}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="cuve"
                      value={row.cuve}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="flacon"
                      value={row.flacon}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="temp"
                      value={row.temp}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="changement"
                      value={row.changement}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="gouttes"
                      value={row.gouttes}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="volume"
                      value={row.volume}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="validation"
                      value={row.validation}
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

export default VerificationF;
