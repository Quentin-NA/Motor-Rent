import React from 'react'
import Axios from 'axios';
import "../CSS/cart.css";
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";


const Cart = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [ motos, setMotos ] = useState();


  useEffect(() =>  {
    Axios.get('http://localhost:3001/cart/'+id).then((response) => {
        setMotos(response.data);
    });
  },[]);

  const reloadPage = () => {
    window.location.reload();
  }

  const deleteResa = (e) => {
    const id = e.target.id;
    console.log(id)
    Axios.delete('http://localhost:3001/delete-reservation/'+id, {
    }).then(() => {
        console.log(motos)
    })
    reloadPage();
    // resetForm();
    // navigate("/car")
  };



  return (
    <>
        <h1 className='cart-title'>Votre panier</h1>
    {motos === undefined || motos === null || motos === false || motos.length === 0 ? (
        <h1>Votre panier est vide</h1>
    ) : (
    <div className='cart-container'>
        {console.log(motos)}
        {motos.map((moto) =>
        <div key={moto.id} className='cart-card'>
            <img src={require(`../../../server/public/images/${moto.img}`)} alt={moto.model}/>
            <div className='date-infos'>
                <p>Date de début</p>
                <p>{moto.start_date}</p>
            </div>
            <div className='date-infos'>
                <p>Date de fin</p>
                <p>{moto.end_date}</p>
            </div>
            <p>{moto.brand}</p>
            <p>{moto.model}</p>
            <p>{moto.price} €</p>
            <i onClick={deleteResa} id={moto.id} className="fa-sharp fa-solid fa-trash trash"></i>
        </div>)}
    </div>
    )}    
    </>
  )

}

export default Cart