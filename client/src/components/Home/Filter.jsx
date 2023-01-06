import React from 'react'
import '../../CSS/filter.css'

const Filter = (props) => {

    const brands = ['Ducati', 'Harley Davidson', 'Suzuki', 'BMW', 'Yamaha']
    

    const handleCheck = (e) => {
      let currentBrand = e.target.value
      console.log(currentBrand)
      // RECUP L ETAT DU check
      let check = e.target.checked
      console.log(check)
      // SI LE CHECK EST TRUE ET QU IL N EST PAS ENCORE DANS checkList ALORS AJOUTER DANS checkList LE NOM DE LA MARQUE
      if (check === true && !props.selection.includes(currentBrand)) {
          // props.selection.push(currentBrand)
          props.setSelection([...props.selection, currentBrand])
          // props.setSelection((current) => current + currentBrand)
      }
      // SI CHECK EST FALSE ET QU IL EST DANS LA LISTE ALORS LE SUPPRIMER
      if (check === false && props.selection.includes(currentBrand)) {

        props.setSelection(props.selection.filter((item) => item !== currentBrand))
      }
      {console.log(props.selection)}
        
    };
  

  return (
    <>
      <div className='filter-container'>
        {brands.map((item) =>
          <div key={item} className="checkbox-box">
              <label>{item} <input type='checkbox' value={item} onChange={handleCheck}/></label> 
          </div>
        )}
        <div className='price-area'>
          <input type="range" name='priceRange' className='range_input' value={props.price} step='1' min='0' max='100' onChange={(e) => {
            props.setPrice(e.target.value)
          }}/>
          <p className='price'>{props.price}€</p>
        </div>
      </div>
    </>
  )
}

export default Filter