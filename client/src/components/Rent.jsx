import React from 'react'
import '../CSS/rent.css'
import Axios from "axios"
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Rent = () => {

  const { id } = useParams();
  const navigate = useNavigate(); 

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState({file:[]});



  const submitRent = (e) => {
    e.preventDefault();
  //   if(id === 0 || id === null || id === undefined){
  //      alert("Veuillez vous connecter avant de louer =)");
  //      navigate("/login")
  //  };
    const formData = new FormData();
    formData.append("brand", brand);
    formData.append("model", model);
    formData.append("price", price);
    formData.append("image", image.file);

    if(brand && model && price && id){
      Axios.post('http://localhost:3001/rent/'+id, formData)
      .then((res) => {
        console.warn(res)
      })
       .then(() => {
        alert("sucessfull insert");
      });
      navigate("/");
    }
  };


  return (
    <>
    {id === false || id === null || id === undefined || id === 0 ? (
      <p>Chargement</p>
      ) : (
        <div className='rent-form-container'>
          {console.log(id)}
          <form method='POST' action="http://localhost:3001/rent/:id" encType="multipart/form-data">
            <h3>Remplir les informations concernant ma moto</h3>
            <div className='input-container'>
              <label>Marque:</label>
              <select name="brand" id='brand' onChange={(e) => {
                setBrand(e.target.value)
                console.log(brand)
              }}>
              <option value="Default">Choisissez</option>
              <option value="Yamaha">Yamaha</option>
              <option value="BMW">BMW</option>
              <option value="Suzuki">Suzuki</option>
              <option value="Ducati">Ducati</option>
              <option value="Harley Davidson">Harley Davidson</option>
              </select>
            </div>

            <div className='input-container'>
              <label>Model:</label>
              <input name="model" id='model' onChange={(e) => {
                setModel(e.target.value)
              }}></input>
            </div>

            <div className='input-container'>
              <label>Prix:</label>
              <input name="price" id='price' onChange={(e) => {
                setPrice(e.target.value)
              }}></input>
            </div>

            <div className='input-container'>
              <label htmlFor="image">Image:</label>
              <input name="image" type="file" id="image" onChange={(e) => {
                setImage({...image,
                  file:e.target.files[0],
                 });
              }}></input>
            </div>

            <button type="submit" onClick={submitRent}>Louer ma moto !</button>
          </form>
        </div>
    )}
    </>
  )
}

export default Rent