import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import Axios from 'axios';
import '../CSS/show_reservation.css'


const ShowReservation = () => {

    const { id } = useParams();
    const [resa, setResa] = useState([]);

    useEffect(() =>  {
        Axios.get('http://localhost:3001/reservation/'+id).then((response) => {
            console.log(response)
            setResa(response.data[0]);
            // setMotoId(resa.moto_id);
        });
      },[]);

      return (
        <>
        {resa === null || undefined ? (
            <div>
                <h1>Chargement...</h1>
            </div>
       
        ) : (
        <div className='reservation-details-container'>
            <h1>Récapitulatif de la réservation:</h1>
                <p>Date de début: {resa.start_date}</p>
                <p>Date de fin: {resa.end_date}</p>
                <p>Prix total: {resa.price}€</p>

                {resa.img === undefined ? (
                    <p>Chargement...</p>
                ) : (
                    <img src={require(`../../../server/public/images/${resa.img}`)} alt={resa.model} />

                )}
                <p>{resa.brand}</p>
                <p>{resa.model}</p>
                    <div className='reservation-btn-container'>
                        <Link to="/" className='reservation-btn'>Confirmer</Link>
                        <Link to="/delete-reservation" className='reservation-btn'>Annuler</Link>
                    </div>
        </div>)}         
        </>
      )
}

export default ShowReservation;