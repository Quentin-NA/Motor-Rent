import React from 'react'
import { useState } from 'react'
import '../../CSS/register.css'
import Axios from "axios"
import { useNavigate } from 'react-router-dom'


const Register = () => {

    const navigate = useNavigate();
    // const [username, setUsername] = useState("");
    // const [userLastName, setUserLastName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const elements = form.elements;
        const username = elements.username.value;
        const userLastName = elements.userLastName.value
        const email = elements.email.value;
        const password = elements.password.value;
        console.log(username)

        Axios.post('http://localhost:3001/register', {
        userLastName: userLastName, 
        username: username,
        email: email, 
        password: password
        }).then(() => {
        alert("sucessfull insert");
        });
        // resetForm();
        navigate("/")
    };


  return (
    <>
        <h1 className='login-title'>S'inscire sur MotoRent</h1>
        <form onSubmit={handleSubmit} className='register-form-container'>
            <div className='user-infos'>
                <div className='user-name'>
                    <label>Nom:</label>
                    <input type="text"
                    id="userLastName"
                    // value={userLastName}
                    // onChange={(e) => setUserLastName(e.target.value)} 
                    />
                </div>
                <div className='user-lastname'>
                    <label>Prenom:</label>
                    <input 
                    type="text"
                    id="username"
                    // value={username}
                    // onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
            </div>
                <label>Email:</label>
                <input 
                type="email"
                id="email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)} 
                />
                <label>Password:</label>
                <input 
                type="text"
                id="password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)} 
                />
                <label>Confirm password:</label>
                <input 
                type="text"
                id="confirmedPassword"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)} 
                />
            <button>S'inscrire</button>
        </form>
    </>
  )
}

export default Register