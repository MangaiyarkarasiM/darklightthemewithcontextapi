import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import './ProductsList.css';
import { GlobalContext } from '../../context/globalContext';

// react state hook
// always define hooks at the top of a component
// useState > [valuePassed, MethodToUpdateTheValue]
// useEffect > (method, depArr)

function ProductsList(props) {
  let {dark} = useContext(GlobalContext);
  const [val, setValue] = useState('')
  useEffect(() => {
    console.log('ProductsList Component', val)
  }, [val.length > 3]);
  
  if(!props.data) {
    return null;
  }

  const onInputChange = (eventObj) => {
    setValue(eventObj.target.value.toLowerCase());
  }

  return (
    <div className='list-container rounded' style={ dark?{backgroundColor :"#222222", color: "white"}:null} >
      <div className='list-header'>
        <div className='title-section'>
          <h2>{props.title} {props.subtitle ? <small>{props.subtitle}</small> : null}</h2>
          <input type='text' value={val} onChange={onInputChange} />
          <span className='ml-1'>Typed: {val}</span>
        </div>
        <button>View All</button>
      </div>
      <div>
        {
          props.data.map((item, index) => {
            if(item.title.toLowerCase().includes(val)) {
              return (
                <Link to={`/product/${item.title}`} key={index}>
                  <Card
                    key={index}
                    title={item.title}
                    desc={item.desc}
                    imageSource={item.image} />
                </Link>
              )
            }
            return null
          })
        }
      </div>
    </div>
  )
}

export default ProductsList;
