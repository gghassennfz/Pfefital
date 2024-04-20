import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddFiche1 = () => {
    const [Quoi, setQuoi] = useState('');
    const [Date, setDate] = useState('');
    const [Td, setTd] = useState('');
    const [Duree, setDuree] = useState('');
    const [Comment, setComment] = useState('');
    const [Qui, setQui] = useState('');
    const [Visa, setVisa] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/fiche2/add', {
            Quoi,
            Date,
            Td,
            Duree,
            Comment,
            Qui,
            Visa,
        })
        .then(res => {
            if(res.data.added) {
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
                <h2>Add Fiche2</h2>
                <div className="form-group">
                    <label htmlFor="Quoi">Quoi:</label>
                    <input type="text" id="Quoi" name="Quoi" 
                    onChange={(e) => setQuoi(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Date">Date:</label>
                    <input type="text" id="Date" name="Date" 
                    onChange={(e) => setDate(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Td">Td:</label>
                    <input type="text" id="Td" name="Td" 
                    onChange={(e) => setTd(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Duree">Duree:</label>
                    <input type="text" id="Duree" name="Duree" 
                    onChange={(e) => setDuree(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Comment">Comment:</label>
                    <input type="text" id="Comment" name="Comment" 
                    onChange={(e) => setComment(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Qui">Qui</label>
                    <input type="text" id="Qui" name="Qui" 
                    onChange={(e) => setQui(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Visa">Visa</label>
                    <input type="text" id="Visa" name="Visa" 
                    onChange={(e) => setVisa(e.target.value)}/>
                </div>
                <button type="submit" className='btn-addst'>Add </button>
            </form>
        </div>
    );
}

export default AddFiche1;
