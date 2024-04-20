import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditFiche1 = () => {
    const [Mp, setMp] = useState('');
    const [Lot, setLot] = useState('');
    const [DLC, setDLC] = useState('');
    const [Quantite, setQuantite] = useState('');
    const [Etanchite, setEtanchite] = useState('');
    const [Etiquette, setEtiquette] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/fiche1/fiche1/${id}`)
        .then(res => {
            setMp(res.data.Mp);
            setLot(res.data.Lot);
            setDLC(res.data.DLC);
            setQuantite(res.data.Quantite);
            setEtanchite(res.data.Etanchite);
            setEtiquette(res.data.Etiquette);
        })
        .catch(err => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/fiche1/fiche1/${id}`, {
            Mp,
            Lot,
            DLC,
            Quantite,
            Etanchite,
            Etiquette
        })
        .then(res => {
            if(res.data.updated) {
                navigate('/fiches1');
            } else {
                console.log(res);
            }
        })
        .catch(err => console.log(err));
    }

    return (
       <div className="hero">
        <div className="appc">
        <div className="work">
            <div className="employe-form-container">
            <form className="employe-form" onSubmit={handleSubmit}>
                <h2 className='title'>Edit Fiche</h2>
                <div className="form-group">
                    <label htmlFor="Mp">Mp:</label>
                    <input type="text" id="Mp" name="Mp" value={Mp}
                    onChange={(e) => setMp(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Lot">Lot:</label>
                    <input type="text" id="Lot" name="Lot" value={Lot}
                    onChange={(e) => setLot(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="DLC">DLC:</label>
                    <input type="text" id="DLC" name="DLC" value={DLC}
                    onChange={(e) => setDLC(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Quantite">Quantite:</label>
                    <input type="text" id="Quantite" name="Quantite" value={Quantite}
                    onChange={(e) => setQuantite(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Etanchite">Etanchite:</label>
                    <input type="text" id="Etanchite" name="Etanchite" value={Etanchite}
                    onChange={(e) => setEtanchite(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Etiquette">Etiquette:</label>
                    <input type="text" id="Etiquette" name="Etiquette" value={Etiquette}
                    onChange={(e) => setEtiquette(e.target.value)}/>
                </div>
                <button type="submit" className='btn-addst'>Update </button>
            </form>
        </div>
        </div>
        </div>
       </div>
    );
}

export default EditFiche1;
