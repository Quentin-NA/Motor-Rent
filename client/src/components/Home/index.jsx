import React from 'react'
import Filter from './Filter'
import List from './List'
import { useState, useEffect } from 'react'
import Axios from 'axios';
import '../../CSS/home.css'

const Home = () => {

  
  const [selection, setSelection] = useState([])
  const [motos, setMotos] = useState([]);
  const [price, setPrice] = useState(50)
  

  useEffect(() =>  {
    Axios.get('http://localhost:3001').then((response) => {
        setMotos(response.data)
        console.log(response.data)
    });
  }, []);

  return (
    <div className='home'>
      <div className="home_panelList-wrap">
        <div className="home_panel-wrap">
          <Filter selection={selection} setSelection={setSelection} price={price} setPrice={setPrice} />
        </div>

        <div className="home_list-wrap">
          <List selection={selection} setSelection={setSelection} motos={motos} setMotos={setMotos} price={price} setPrice={setPrice}/>
        </div>
      </div>
    </div>
  )
}

export default Home