import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Fiche1Card from './Fiche1Card';
import '../css/Fiche1.css';

const Fiches1 = ({ role }) => {
  const [fiches1, setFiches1] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/fiche1/fiches1')
      .then(res => {
        setFiches1(res.data);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
   <div className="hero">
    <div className="appc">
    <div className="work">
     <div className="Displayfiche">
      {fiches1.map((fiche1, index) => ( // Change fiches to fiches1
        <Fiche1Card key={fiche1._id} fiche1={fiche1} role={role} />
      ))}
    </div>
   </div>
    </div>
   </div>
  );
};

export default Fiches1;
