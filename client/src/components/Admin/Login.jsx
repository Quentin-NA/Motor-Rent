import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import '../../CSS/login.css'
import Axios from "axios"
import {
  BrowserRouter as Router,
  // Switch,
  // Route,
  // Routes,
  Link
} from "react-router-dom";


const Login = () => {


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [id, setId] = useState(0);
  const dispatch = useDispatch();
  const {userId}  = useSelector(state => state)


  const handleChange = (e) => {
    switch (e.target.id) {
      case 'email':
        setEmail(e.target.value);
      break
      case 'password':
        setPassword(e.target.value);
      break
      default: return;
  }
} 
  
  const submit = (e) => {
    console.log(email, password)
    e.preventDefault();
    
    Axios.post('http://localhost:3001/login', {
      email: email,
      password: password
    }).then((res) => res.data)
      .then((res) => {
        console.log(res)
        setMessage(res.message);
        setId(res.userId);
        console.log(id)
        setResponse(res.response);
        dispatch({
              type: "CONNEXION",
              userId: id
        })
      })
  }

  console.log(message, response, id)
            
            
  return (
    <>  
      <form method="POST" action="http://localhost:3001/login" className='login-form-container' onSubmit={submit}>
        <label>Email:</label>
        <input type="text" id='email' name='email' value={email} onChange={handleChange}/>
        <label>Password:</label>
        <input type="text" id='password' name='password'value={password} onChange={handleChange}/>
        <div className='remember-zone'>
            <span>Remember me</span>
            <input type="checkbox" />
        </div>
        <button>se connecter</button>
      </form>
    </>
  )
}

export default Login


