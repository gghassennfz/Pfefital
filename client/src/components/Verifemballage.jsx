import axios from "axios";
import React, { useState } from "react";
import { FaPlus, FaSave, FaTrash } from "react-icons/fa";

function VerificationForm() {
  const [rows, setRows] = useState([
    {
      dateheured: "",
      dateheureh: "",
      article: "",
      version: "",
      datation: "",
      lddc: "",
      qualitearticle: "",
      prelevee: "",
      nonconfirme: "",
      decision: "",
      controle: "",
    },
  ]);
  const [lot, setLot] = useState("");
  const [dlc, setDlc] = useState("");
  const [date, setDate] = useState("");
  const [action, setAction] = useState("");
  const [chef, setChef] = useState("");
  const [programme, setProgramme] = useState("");
  const [validation, setValidation] = useState("");

  const addRow = () => {
    setRows([
      ...rows,
      {
        dateheured: "",
        dateheureh: "",
        article: "",
        version: "",
        datation: "",
        lddc: "",
        qualitearticle: "",
        prelevee: "",
        nonconfirme: "",
        decision: "",
        controle: "",
      },
    ]);
  };

  const saveData = () => {
    axios
      .post("http://localhost:3001/vemballage/add", {
        lot,
        dlc,
        date,
        action,
        chef,
        programme,
        validation,
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

  return (
    <div className="hero">
      <div className="appc">
        <div className="work">
          <h1 className="titre1">Formulaire verification info emballage :</h1>
          <div className="fom-ow">
            <div className="form-field">
              <label>Lot :</label>
              <input
                type="text"
                name="lot"
                onChange={(e) => setLot(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>Dlc:</label>
              <input
                type="text"
                name="dlc"
                onChange={(e) => setDlc(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>Date de production :</label>
              <input
                type="date"
                name="date"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>N° d'action:</label>
              <input
                type="text"
                name="action"
                onChange={(e) => setAction(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>Chef d'equipe :</label>
              <input
                type="text"
                name="chef"
                onChange={(e) => setChef(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>Programme emballage :</label>
              <input
                type="text"
                name="programme"
                onChange={(e) => setProgramme(e.target.value)}
              />
            </div>
          </div>
          <div className="form-field">
            <label>Validation equipe controle qualité :</label>
            <input
              type="text"
              name="validation"
              onChange={(e) => setValidation(e.target.value)}
            />
          </div>
          <table className="tableP">
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
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <input
                        type="date"
                        name="dateheured"
                        value={row.dateheured}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                      <input
                        type="time"
                        name="dateheureh"
                        value={row.dateheureh}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                    </div>
                  </td>

                  <td>
                    <input
                      type="text"
                      name="article"
                      value={row.article}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="version"
                      value={row.version}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="datation"
                      value={row.datation}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="lddc"
                      value={row.lddc}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="qualitearticle"
                      value={row.qualitearticle}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="prelevee"
                      value={row.prelevee}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="nonconfirme"
                      value={row.nonconfirme}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="decision"
                      value={row.decision}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="controle"
                      value={row.controle}
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

export default VerificationForm;
