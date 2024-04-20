import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Fiche2Card from './Fiche2Card'; // Assuming you have a component named Fiche2Card
import '../css/Fiche1.css'; // Assuming you have corresponding CSS

const Fiches2 = () => {
  const [fiches2, setFiches2] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/fiche2/fiches2')
      .then(res => {
        setFiches2(res.data);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='fiche2-list'>
      {fiches2.map(fiche2 => {
        return <Fiche2Card key={fiche2.id} fiche2={fiche2}></Fiche2Card>;
      })}
    </div>
  );
}

export default Fiches2;
