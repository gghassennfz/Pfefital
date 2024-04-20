import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaPlus, FaSave, FaTrash } from "react-icons/fa";
import "../css/VerifPese.css";

function VerificationPese() {
    const [rows, setRows] = useState([
        {
            lmp: "",
            lot: "",
            dlc: "",
            quantite: "",
            etanchite: "",
            fournisseur: "",
        },
    ]);

    const [DV, setDv] = useState("");
    const [RBT, setRBT] = useState("");
    const [Pfabrication, setPfabrication] = useState("");
    const [Ptransfert, setPtransfert] = useState("");
    const [Vpartage, setVpartage] = useState("");
    const [VU, setVu] = useState("");
    const [VP, setVp] = useState("");
    const [Verifsacs, setVerifsacs] = useState("");
    const [Nombreprep, setNombreprep] = useState("");
    const [Dp, setDp] = useState("");
    const [DPF, setDPF] = useState("");
    const [LOT, setLOT] = useState("");
    const [DLC, setDLC] = useState("");
    const [Dateproo, setDateproo] = useState("");

    const addRow = () => {
        setRows([
            ...rows,
            {
                lmp: "",
                lot: "",
                dlc: "",
                quantite: "",
                etanchite: "",
                fournisseur: "",
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

    const saveData = () => {
        
            axios
                .post("http://localhost:3001/vpese/add", {
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
                    activities: rows,
                })
                .then((response) => {
                    console.log("Data saved successfully:", response.data);
                    toast(`Les Donneés Sont Sauvegarder`, {
                        type: "success",
                        position: "bottom-right",
                        
                        });
                })
                .catch((error) => {
                    console.error("Error saving data:", error);
                });
        
    };

    return (
        
        <div className="hero">
            <div className="appc">
            <div className="work">
            <h1 className="titre1">Formulaire Verification Des Paniers De Pese :</h1>
            <div className="form-row1">
                <div className="form-field1">
                    <label>Date de Verification :</label>
                <input className="D1" type="text" value={DV} onChange={(e) => setDv(e.target.value)} placeholder="JJ/MM/AAAA" />
                <br/>
                <label>Reference de Bon de Transfert :</label>
                <input className="D1" type="text" value={RBT} onChange={(e) => setRBT(e.target.value)}  />
                <div>
                
                <div>
                
                <div className="radio-container1">
                    <label className="radioword">Presence de tous les ingredients par rapport au fiche fabrication  : </label>
                    <label>
                        <input
                            type="radio"
                            value="Confirme"
                            checked={Pfabrication === "Confirme"}
                            onChange={() => setPfabrication("Confirme")}
                        />
                        C
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Non Confirme"
                            checked={Pfabrication === "Non Confirme"}
                            onChange={() => setPfabrication("Non Confirme")}
                        />
                        N C
                    </label>
                </div>
            </div>

            <div>
                
                <div className="radio-container1">
                <label className="radioword" >Presence de tous les ingedients par rapport au bon de transfert :</label>
                    <label>
                        <input
                            type="radio"
                            value="Confirme"
                            checked={Ptransfert === "Confirme"}
                            onChange={() => setPtransfert("Confirme")}
                        />
                        C
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Non Confirme"
                            checked={Ptransfert === "Non Confirme"}
                            onChange={() => setPtransfert("Non Confirme")}
                        />
                        N C
                    </label>
                </div>
            </div>

            <div>
                
                <div className="radio-container1"> 
                <label className="radioword" >verification de la fiche fabrication au niveau du panier par rapport au dossier de partage  :</label>
                    <label>
                        <input
                            type="radio"
                            value="Confirme"
                            checked={Vpartage === "Confirme"}
                            onChange={() => setVpartage("Confirme")}
                        />
                        C
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Non Confirme"
                            checked={Vpartage === "Non Confirme"}
                            onChange={() => setVpartage("Non Confirme")}
                        />
                        N C
                    </label>
                </div>
            </div>
            <input className="D2" type="text" value={VU} onChange={(e) => setVu(e.target.value)} placeholder="Version utilise" />
            <br/>
            <input className="D2" type="text" value={VP} onChange={(e) => setVp(e.target.value)} placeholder="Version partage" />
            <div>
                
                <div className="radio-container1">
                    <label className="radioword" >verification sacs gelule vracs  :</label>
                    <label>
                        <input
                            type="radio"
                            value="Confirme"
                            checked={Verifsacs === "Confirme"}
                            onChange={() => setVerifsacs("Confirme")}
                        />
                        C
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Non Confirme"
                            checked={Verifsacs === "Non Confirme"}
                            onChange={() => setVerifsacs("Non Confirme")}
                        />
                        N C
                    </label>
                </div>
            </div>
            </div>
            <div>
            <label>Nombre de préparation</label>
            <input type="text" value={Nombreprep} onChange={(e) => setNombreprep(e.target.value)}  />
            <label>Date de production :</label>
            <input type="text" value={Dateproo} onChange={(e) => setDateproo(e.target.value)}  />
            <label>Designation PF :</label>
            <input type="text" value={DPF} onChange={(e) => setDPF(e.target.value)}  />
            <label>Lot :</label>
            <input type="text" value={LOT} onChange={(e) => setLOT(e.target.value)}  />
            <label>DP :</label>
            <input type="text" value={Dp} onChange={(e) => setDp(e.target.value)}  />
            <label>DlC :</label>
            <input type="text" value={DLC} onChange={(e) => setDLC(e.target.value)}  />

            </div>
            </div>
            </div>
            <table className="TableP">
                <thead>
                    <tr>
                        <th>Liste des Matières Premières(Designation + Lot + DLC)</th>
                        <th>Lot</th>
                        <th>DLC</th>
                        <th>Quantité</th>
                        <th>Etanchéité + Sécurité des bouchons</th>
                        <th>(Lot + DL) Selon Etiquette Fournisseurs</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td><input type="text" name="lmp" value={row.lmp} onChange={(e) => handleInputChange(index, e)} /></td>
                            <td><input type="text" name="lot" value={row.lot} onChange={(e) => handleInputChange(index, e)} /></td>
                            <td><input type="text" name="dlc" value={row.dlc} onChange={(e) => handleInputChange(index, e)} /></td>
                            <td><input type="text" name="quantite" value={row.quantite} onChange={(e) => handleInputChange(index, e)} /></td>
                            <td><input type="text" name="etanchite" value={row.etanchite} onChange={(e) => handleInputChange(index, e)} /></td>
                            <td><input type="text" name="fournisseur" value={row.fournisseur} onChange={(e) => handleInputChange(index, e)} /></td>
                            <td>
                            <button className="btnDeletee" onClick={() => deleteRow(index)}>
                            <FaTrash />
                            </button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="action-btn" onClick={addRow}><FaPlus /> Ajouter ligne</button>
            <button className="action-btn2" onClick={saveData}><FaSave />Sauvgarder</button>
        </div>

            </div>
        </div>
    );
}

export default VerificationPese;
