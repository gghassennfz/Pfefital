import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditFiche2 = () => {
    const [Quoi, setQuoi] = useState('');
    const [Date, setDate] = useState('');
    const [Td, setTd] = useState('');
    const [Duree, setDuree] = useState('');
    const [Comment, setComment] = useState('');
    const [Qui, setQui] = useState('');
    const [Visa, setVisa] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/fiche2/fiche2/${id}`)
        .then(res => {
            setQuoi(res.data.Quoi);
            setDate(res.data.Date);
            setTd(res.data.Td);
            setDuree(res.data.Duree);
            setComment(res.data.Comment);
            setQui(res.data.Qui);
            setVisa(res.data.Visa);
        })
        .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/fiche2/fiche2/${id}`, {
            Quoi,
            Date,
            Td,
            Duree,
            Comment,
            Qui,
            Visa,
        })
        .then(res => {
            if(res.data.updated) {
                navigate('/fiches2');
            } else {
                console.log(res);
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="employe-form-container">
            <form className="employe-form" onSubmit={handleSubmit}>
                <h2>Edit Fiche2</h2>
                <div className="form-group">
                    <label htmlFor="Quoi">Quoi:</label>
                    <input type="text" id="Quoi" name="Quoi" value={Quoi}
                    onChange={(e) => setQuoi(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Date">Date:</label>
                    <input type="text" id="Date" name="Date" value={Date}
                    onChange={(e) => setDate(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Td">Td:</label>
                    <input type="text" id="Td" name="Td" value={Td}
                    onChange={(e) => setTd(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Duree">Duree:</label>
                    <input type="text" id="Duree" name="Duree" value={Duree}
                    onChange={(e) => setDuree(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Comment">Comment:</label>
                    <input type="text" id="Comment" name="Comment" value={Comment}
                    onChange={(e) => setComment(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Qui">Qui:</label>
                    <input type="text" id="Qui" name="Qui" value={Qui}
                    onChange={(e) => setQui(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Visa">Visa:</label>
                    <input type="text" id="Visa" name="Visa" value={Visa}
                    onChange={(e) => setVisa(e.target.value)}/>
                </div>
                <button type="submit" className='btn-addst'>Update </button>
            </form>
        </div>
    );
}

export default EditFiche2;
