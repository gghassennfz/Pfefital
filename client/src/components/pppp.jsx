import axios from "axios";
import { default as React, default as React, useEffect, useState } from "react";
import { toast } from "react-toastify";
import EditVerifNettoyage from "./EditVerifNettoyage";

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

const Nettoyage = () => {
  const [verifications, setVerifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editedVerificationId, setEditedVerificationId] = useState();
  const [editedVerificationRow, setEditedVerificationRow] = useState();

  const getVerifications = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:3001/vnettoyage/vnettoyage")
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

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/vnettoyage/vnettoyage/${id}`)
      .then((res) => {
        if (res.data.deleted) {
          getVerifications();
          toast(`Supprimer`, {
            type: "success",
            position: "bottom-right",
          });
        }
      })
      .catch((err) => console.log(err));
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
        `http://localhost:3001/vnettoyage/vnettoyage/${editedVerificationId}`,
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
    <div className="container">
      <EditVerifNettoyage verifications={verifications} />

      <h1 className="titre1">Affichage Verification de Nettoyage :</h1>
      {verifications.map((verification, index) => {
        const { _id: id, Produit, Lot, Dp, activities } = verification;

        const isTheSelectedRow = editedVerificationId === id;

        return (
          <div key={index}>
            <table>
              <thead>
                <tr>
                  <th>Produit à travailler :</th>
                  <th>Numéro de lot : </th>
                  <th>Date de production :</th>
                </tr>
              </thead>
              <tbody>
                <tr key={index}>
                  <td>{Produit}</td>
                  <td>{Lot}</td>
                  <td>{Dp}</td>
                </tr>
              </tbody>
            </table>
            <div className="form-row">
              <div className="form-field">
                <label>
                  Produit à travailler :<br />
                  {isTheSelectedRow ? (
                    <Input
                      value={editedVerificationRow.Produit}
                      name="Produit"
                      onChange={handleEditedVerifCell}
                    />
                  ) : (
                    Produit
                  )}
                </label>
              </div>
              <div className="form-field">
                <label>
                  Numéro de lot : <br />
                  {isTheSelectedRow ? (
                    <Input
                      value={editedVerificationRow.Lot}
                      name="Lot"
                      onChange={handleEditedVerifCell}
                    />
                  ) : (
                    Lot
                  )}
                </label>
              </div>
              <div className="form-field">
                <label>
                  Date de production : <br />
                  {isTheSelectedRow ? (
                    <Input
                      value={editedVerificationRow.Dp}
                      name="Dp"
                      onChange={handleEditedVerifCell}
                    />
                  ) : (
                    Dp
                  )}
                </label>
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
                {console.log({ activities })}
                {activities.map(
                  ({
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
                  }) => (
                    <tr>
                      <td>
                        {isTheSelectedRow ? (
                          <Input
                            value={editedVerificationRow.machine}
                            name="machine"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          machine
                        )}
                      </td>
                      <td>
                        {isTheSelectedRow ? (
                          <Input
                            value={editedVerificationRow.produit}
                            name="machine"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          produit
                        )}
                      </td>
                      <td>
                        {isTheSelectedRow ? (
                          <Input
                            value={editedVerificationRow.reference}
                            name="reference"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          reference
                        )}
                      </td>
                      <td>
                        {isTheSelectedRow ? (
                          <Input
                            value={editedVerificationRow.nettDesinfection}
                            name="nettDesinfection"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          nettDesinfection
                        )}
                      </td>
                      <td>
                        {isTheSelectedRow ? (
                          <Input
                            value={editedVerificationRow.rincage}
                            name="rincage"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          rincage
                        )}
                      </td>
                      <td>
                        {isTheSelectedRow ? (
                          <Input
                            value={editedVerificationRow.validationRinsage}
                            name="validationRinsage"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          validationRinsage
                        )}
                      </td>
                      <td>
                        {isTheSelectedRow ? (
                          <Input
                            value={editedVerificationRow.verificationConformite}
                            name="verificationConformite"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          verificationConformite
                        )}
                      </td>
                      <td>
                        {isTheSelectedRow ? (
                          <Input
                            value={editedVerificationRow.testAllergene}
                            name="testAllergene"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          testAllergene
                        )}
                      </td>
                      <td>
                        {isTheSelectedRow ? (
                          <Input
                            value={editedVerificationRow.validationTest}
                            name="validationTest"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          validationTest
                        )}
                      </td>
                      <td>
                        {isTheSelectedRow ? (
                          <Input
                            value={editedVerificationRow.observation}
                            name="observation"
                            onChange={handleEditedVerifCell}
                          />
                        ) : (
                          observation
                        )}
                      </td>
                      <td>
                        {isTheSelectedRow ? (
                          <>
                            <button onClick={() => handleCancelEdit()}>
                              cancel
                            </button>

                            <button onClick={handleEditVerification}>
                              save
                            </button>
                          </>
                        ) : (
                          <button
                            disabled={editedVerificationId}
                            onClick={() => {
                              setEditedVerificationId(verification._id);
                              handleEditedVerificationRow(verification);
                            }}
                          >
                            Edit
                          </button>
                        )}

                        <button onClick={() => handleDelete(verification._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default Nettoyage;

55
55
555
55

const Input = ({ value, name, onChange }) => {
    return (
        <div className="form-field1">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
            />
        </div>
    );
};

const Pese = () => {
    const [verifications, setVerifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editedVerificationId, setEditedVerificationId] = useState();
    const [editedVerificationRow, setEditedVerificationRow] = useState();

    console.log({ editedVerificationRow });

    const getVerifications = () => {
        setIsLoading(true);
        axios
            .get("http://localhost:3001/vpese/vpese")
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

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:3001/vpese/vpese/${id}`)
            .then((res) => {
                if (res.data.deleted) {
                    getVerifications();
                    toast(`Supprimer`, {
                        type: "success",
                        position: "bottom-right",
                    });
                }
            })
            .catch((err) => console.log(err));
    };

    const handleEditedVerificationRow = (verification) => {
        setEditedVerificationRow(verification);
    };

    const handleCancelEdit = () => {
        setEditedVerificationId();
        setEditedVerificationRow();
    };

    const handleEditVerification = () => {
        setIsLoading(true);
        axios
            .put(
                `http://localhost:3001/vpese/vpese/${editedVerificationId}`,
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

    return (
        <div className="container1">
            <h1 className="titre1">Affichage Verification Des Paniers De Pese :</h1>
            {verifications.map((verification, index) => {
                const {
                    _id: id,
                    DV,
                    RBT,
                    Pfabrication,
                    Ptransfert,
                    Vpartage,
                    VU,
                    VP,
                    Verifsacs,
                    Nombreprep,
                    Datepro,
                    DPF,
                    LOT,
                    Dp,
                    DLC,
                    lmp,
                    lot,
                    dlc,
                    quantite,
                    etanchite,
                    fournisseur,
                } = verification;

                const isTheSelectedRow = editedVerificationId === id;

                const handleEditedVerifCell = (name, value) => {
                    setEditedVerificationRow({
                        ...editedVerificationRow,
                        [name]: value,
                    });
                };

                return (
                    <div key={index}>
                        <div className="form-row1">
                            <div>
                                <div className="form-field1">
                                    <label>
                                        Date de Verification :<br />
                                        {isTheSelectedRow ? (
                                            <Input
                                                value={editedVerificationRow.DV}
                                                name="DV"
                                                onChange={handleEditedVerifCell}
                                            />
                                        ) : (
                                            DV
                                        )}
                                    </label>
                                </div>
                                <div className="form-field1">
                                    <label>
                                    Reference de Bon de Transfert :<br />
                                        {isTheSelectedRow ? (
                                            <Input
                                                value={editedVerificationRow.RBT}
                                                name="RBT"
                                                onChange={handleEditedVerifCell}
                                            />
                                        ) : (
                                            RBT
                                        )}
                                    </label>
                                </div>
                                <div className="form-field1">
                                    <label>
                                    Presence de tous les ingredients par rapport au fiche fabrication  :<br />
                                        {isTheSelectedRow ? (
                                            <Input
                                                value={editedVerificationRow.Pfabrication}
                                                name="Pfabrication"
                                                onChange={handleEditedVerifCell}
                                            />
                                        ) : (
                                            Pfabrication
                                        )}
                                    </label>
                                </div>
                                <div className="form-field1">
                                    <label>
                                    Presence de tous les ingedients par rapport au bon de transfert :<br />
                                        {isTheSelectedRow ? (
                                            <Input
                                                value={editedVerificationRow.Ptransfert}
                                                name="Ptransfert"
                                                onChange={handleEditedVerifCell}
                                            />
                                        ) : (
                                            Ptransfert
                                        )}
                                    </label>
                                </div>
                                <div className="form-field1">
                                    <label>
                                        verification de la fiche fabrication au niveau du panier par rapport au dossier de partage  :<br />
                                        {isTheSelectedRow ? (
                                            <Input
                                                value={editedVerificationRow.Vpartage}
                                                name="Vpartage"
                                                onChange={handleEditedVerifCell}
                                            />
                                        ) : (
                                            Vpartage
                                        )}
                                    </label>
                                </div>
                                <div className="form-field1">
                                    <label>
                                    Version utilise :<br />
                                        {isTheSelectedRow ? (
                                            <Input
                                                value={editedVerificationRow.VU}
                                                name="VU"
                                                onChange={handleEditedVerifCell}
                                            />
                                        ) : (
                                            VU
                                        )}
                                    </label>
                                </div>
                                <div className="form-field1">
                                    <label>
                                    Version partage :<br />
                                        {isTheSelectedRow ? (
                                            <Input
                                                value={editedVerificationRow.VP}
                                                name="VP"
                                                onChange={handleEditedVerifCell}
                                            />
                                        ) : (
                                            VP
                                        )}
                                    </label>
                                </div>
                                <div className="form-field1">
                                    <label>
                                    verification sacs gelule vracs  :<br />
                                        {isTheSelectedRow ? (
                                            <Input
                                                value={editedVerificationRow.Verifsacs}
                                                name="Verifsacs"
                                                onChange={handleEditedVerifCell}
                                            />
                                        ) : (
                                            Verifsacs
                                        )}
                                    </label>
                                </div>
                                <div className="form-field1">
                                    <label>
                                    Nombre de préparation :<br />
                                        {isTheSelectedRow ? (
                                            <Input
                                                value={editedVerificationRow.Nombreprep}
                                                name="Nombreprep"
                                                onChange={handleEditedVerifCell}
                                            />
                                        ) : (
                                            Nombreprep
                                        )}
                                    </label>
                                </div>
                                <div className="form-field1">
                                    <label>
                                    Nombre de préparation :<br />
                                        {isTheSelectedRow ? (
                                            <Input
                                                value={editedVerificationRow.Datepro}
                                                name="Datepro"
                                                onChange={handleEditedVerifCell}
                                            />
                                        ) : (
                                            Datepro
                                        )}
                                    </label>
                                </div>
                                
                                <div className="form-field1">
                                    <label>
                                    Designation PF :<br />
                                        {isTheSelectedRow ? (
                                            <Input
                                                value={editedVerificationRow.DPF}
                                                name="DPF"
                                                onChange={handleEditedVerifCell}
                                            />
                                        ) : (
                                            DPF
                                        )}
                                    </label>
                                </div>
                                <div className="form-field1">
                                    <label>
                                    Lot :<br />
                                        {isTheSelectedRow ? (
                                            <Input
                                                value={editedVerificationRow.LOT}
                                                name="LOT"
                                                onChange={handleEditedVerifCell}
                                            />
                                        ) : (
                                            LOT
                                        )}
                                    </label>
                                </div>
                                <div className="form-field1">
                                    <label>
                                    DP :<br />
                                        {isTheSelectedRow ? (
                                            <Input
                                                value={editedVerificationRow.Dp}
                                                name="Dp"
                                                onChange={handleEditedVerifCell}
                                            />
                                        ) : (
                                            Dp
                                        )}
                                    </label>
                                </div>
                                <div className="form-field1">
                                    <label>
                                    DLC :<br />
                                        {isTheSelectedRow ? (
                                            <Input
                                                value={editedVerificationRow.DLC}
                                                name="DLC"
                                                onChange={handleEditedVerifCell}
                                            />
                                        ) : (
                                            DLC
                                        )}
                                    </label>
                                </div> 

                                
                            </div>
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
                                <tr key={index}>
                                    <td>
                                        {isTheSelectedRow ? (
                                            <Input
                                                value={editedVerificationRow.lmp}
                                                name="lmp"
                                                onChange={handleEditedVerifCell}
                                            />
                                        ) : (
                                            lmp
                                        )}
                                    </td>
                                    <td>
                                        {isTheSelectedRow ? (
                                            <Input
                                                value={editedVerificationRow.lot}
                                                name="lot"
                                                onChange={handleEditedVerifCell}
                                            />
                                        ) : (
                                            lot
                                        )}
                                    </td>
                                    <td>
                                        {isTheSelectedRow ? (
                                            <Input
                                                value={editedVerificationRow.dlc}
                                                name="dlc"
                                                onChange={handleEditedVerifCell}
                                            />
                                        ) : (
                                            dlc
                                        )}
                                    </td>
                                    <td>
                                        {isTheSelectedRow ? (
                                            <Input
                                                value={editedVerificationRow.quantite}
                                                name="quantite"
                                                onChange={handleEditedVerifCell}
                                            />
                                        ) : (
                                            quantite
                                        )}
                                    </td>
                                    <td>
                                        {isTheSelectedRow ? (
                                            <Input
                                                value={editedVerificationRow.etanchite}
                                                name="etanchite"
                                                onChange={handleEditedVerifCell}
                                            />
                                        ) : (
                                            etanchite
                                        )}
                                    </td>
                                    <td>
                                        {isTheSelectedRow ? (
                                            <Input
                                                value={editedVerificationRow.fournisseur}
                                                name="fournisseur"
                                                onChange={handleEditedVerifCell}
                                            />
                                        ) : (
                                            fournisseur
                                        )}
                                    </td>
                                    <td>
                                        {isTheSelectedRow ? (
                                            <>
                                                <button onClick={() => handleCancelEdit()}>cancel</button>
                                                <button onClick={handleEditVerification}>save</button>
                                            </>
                                        ) : (
                                            <button
                                                disabled={editedVerificationId}
                                                onClick={() => {
                                                    setEditedVerificationId(verification._id);
                                                    handleEditedVerificationRow(verification);
                                                }}
                                            >
                                                Edit
                                            </button>
                                        )}
                                        <button onClick={() => handleDelete(verification._id)}>Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            })}
        </div>
    );
};

export default Pese;

