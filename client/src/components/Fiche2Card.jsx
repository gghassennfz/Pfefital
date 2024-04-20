import React from 'react';
import { Link } from 'react-router-dom';

const Fiche2Card = ({ fiche2 }) => {
    const { Quoi, Date, Td, Duree, Comment, Qui, Visa, _id } = fiche2;

    return (
        <div className='fiche2-card'>
            <div className="fiche2-details">
                <h3>Nom Machine:{Quoi}</h3>
                <p>Date: {Date}</p>
                <p>Temps Début: {Td}</p>
                <p>Duree: {Duree}</p>
                <p>Comment: {Comment}</p>
                <p>Nom Prénom: {Qui}</p>
                <p>Visa: {Visa}</p>
            </div>
        
            <div className="fiche2-actions">
                <button>
                    <Link to={`/fiche2/${_id}`} className='btn-link'>Edit</Link>
                </button>
                <button>
                    <Link to={`/delete/${_id}`} className='btn-link'>Delete</Link>
                </button>
            </div>
        </div>
    );
}

export default Fiche2Card;
