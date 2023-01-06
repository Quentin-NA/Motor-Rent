import React from 'react'
import Axios from 'axios';
import "../CSS/account.css";
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";


const Account = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [ user, setUser ] = useState();
  const [lastname, setLastname] = useState("lastname");
  const [name, setName] = useState("name");
  const [email, setEmail] = useState("email");
  const [password, setPassword] = useState("password");

  useEffect(() =>  {
    Axios.get('http://localhost:3001/account/'+id).then((response) => {
      setUser(response.data[0]);
      console.log(response)
    });
  },[]);

  const enabledField = (input) =>{
    const element = document.querySelector(`#${input}`);
    element.removeAttribute('disabled');
  } 

  const handleChange = (e) => {
    switch (e.target.id) {
      case 'lasname':
        setLastname(e.target.value);
      break
      case 'name':
        setName(e.target.value);
      break
      case 'email':
        setEmail(e.target.value);
      break
      case 'password':
        setPassword(e.target.value);
      break
      default: return;
  }
} 

const reloadPage = () => {
  window.location.reload();
}

const handleSubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  const elements = form.elements;
  const lastname = elements.lastname.value;
  const name = elements.name.value
  const email = elements.email.value;
  const password = elements.password.value;

  Axios.put('http://localhost:3001/update-account/'+id, {
  lastname: lastname, 
  name: name,
  email: email, 
  password: password
  });
  // resetForm();
  reloadPage();
};

      return (
          <div className='user-infos-container'>
            <h1>Mon compte:</h1>
                {user === undefined || null ? (
                  <p>Chargement...</p>
                ) : (
                <form onSubmit={handleSubmit}>
                    <div className='account-infos'><i className="fa-solid fa-user"></i><input onChange={handleChange} defaultValue={user.user_lastname} id='lastname' disabled></input><i onClick={() => enabledField(lastname)} className="fa-sharp fa-solid fa-pen-to-square update"></i></div>
                    <div className='account-infos'><i className="fa-solid fa-user"></i><input onChange={handleChange} defaultValue={user.user_name} id='name' disabled></input><i onClick={() => enabledField(name)} className="fa-sharp fa-solid fa-pen-to-square update"></i></div>
                    <div className='account-infos'><i className="fa-solid fa-at"></i><input onChange={handleChange} defaultValue={user.email} id='email' disabled></input><i onClick={() => enabledField(email)} className="fa-sharp fa-solid fa-pen-to-square update"></i></div>
                    <div className='account-infos'><i className="fa-solid fa-lock"></i><input onChange={handleChange} defaultValue={user.user_password} id='password' disabled></input><i onClick={() => enabledField(password)} className="fa-sharp fa-solid fa-pen-to-square update"></i></div>
                    <div className='account-btn'>
                      <button className="user-cart-link">Valider mes informations</button>
                      <Link to={`/cart/${id}`} className="user-cart-link" id='resa-link'>Voir mes réservations</Link>
                    </div>
                </form>
                )}
          </div>
      )
}

export default Account