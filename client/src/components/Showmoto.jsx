import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Axios from 'axios';
import '../CSS/showmoto.css'
import DateRangeComp from './utils/DateRange';
import { addDays } from 'date-fns'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Showmoto = () => {

  const { id } = useParams();
  // const { resId } = useParams();
  const navigate = useNavigate();
  const userId = useSelector(state => state.userId)
  const [moto, setMoto] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [reservation, setReservation] = useState();
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ])
    
    
    const calcReservationPrice = (start, end, price) => {
    
      const reservationTime = (end - start) / (1000 * 3600 * 24);
      // console.log(reservationTime)
      setTotalPrice(reservationTime*price);
      console.log(totalPrice)
    }

    
    useEffect(() =>  {
        Axios.get('http://localhost:3001/moto/'+id).then((response) => {
            setMoto(response.data[0]);
        });
        Axios.get('http://localhost:3001/reservations').then((response) => {
          setReservation(response.data[response.data.length-1].id);
        });
      },[reservation]);
      
      const submit = (e) => {
        e.preventDefault();
        const userID = userId;
        const motoId = parseInt(id);
        const startDate = range[0].startDate.toLocaleDateString().toString();
        const endDate = range[0].endDate.toLocaleDateString().toString();
        const price = totalPrice;
        // console.log("user id:" + userID)
        console.log("moto id:" + motoId)
        Axios.post('http://localhost:3001/add/reservation', {
          start_date: startDate, 
          end_date: endDate,
          price: price, 
          user_id: userID,
          moto_id : motoId
        });
        console.log(reservation)
        navigate(`/reservation/${reservation}`)
      }
    
  return (
    <>
    <div className='show-container'>
      {moto === null ? <h1>Chargement...</h1> : 
      <div className='show-moto-card'>
          <img src={require(`../../../server/public/images/${moto.img}`)} alt={moto.model}/>
          <div className='show-moto-details'>
            <p>{moto.brand} {moto.model}</p>
            <p>{moto.price}€/jour</p>
          </div>
      </div>}

        
      <div className='date-range'>
        <DateRangeComp range={range} setRange={setRange} />
        <div className='res-btn'>
        {console.log(reservation)}
          <Link className='reservation-btn' onClick={() => {calcReservationPrice(range[0].startDate, range[0].endDate, moto.price)}} >Calculer le total: {totalPrice}€</Link>
          {console.log(reservation)}
          <Link to={`/reservation/${reservation}`} onClick={submit} className='reservation-btn'>Reserver !</Link>
        </div>
      </div>
    </div>
    </>
  )
};

export default Showmoto