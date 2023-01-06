import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../CSS/list.css'

const List = (props) => {

    return (
        <>
            <div className='home-container'>
                <div className='card-container'>
                    {console.log(props.selection)}
                    {console.log(props.motos)}
                    {props.selection == false ? props.motos.map((moto) => 
                        <NavLink to={`/moto/${moto.id}`} className="card-link">
                            <div key={moto.id} className='moto-card'>
                                <div className='box'>
                                    <img src={require(`../../../../server/public/images/${moto.img}`)} alt={moto.model} className="card-img"/>
                                </div>
                                <div className='moto-details'>
                                    <div>
                                        <h3>{moto.brand}</h3> 
                                        <h3>{moto.model}</h3>
                                    </div>
                                    <p>{moto.price}€/jour</p>
                                </div>
                            </div>
                        </NavLink>
                    ) : props.motos.filter(moto => props.selection.find(brand => brand === moto.brand) && moto.price < props.price /*&& DISPO*/).map((moto) =>
                        <NavLink to={`/moto/${moto.id}`} className="card-link">
                            <div key={moto.id} className='moto-card'>
                                <div className='box'>
                                    <img src={require(`../../../../server/public/images/${moto.img}`)} alt={moto.model} className="card-img"/>
                                </div>
                                <div className='moto-details'>
                                    <div>
                                        <h3>{moto.brand}</h3> 
                                        <h3>{moto.model}</h3>
                                    </div>
                                    <p>{moto.price}€/jour</p>
                                </div>
                            </div>
                        </NavLink>
                    )}
                </div>
            </div>
        </>
    )
}

export default List