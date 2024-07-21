import React, { useEffect, useState } from 'react';
import {add } from '../store/CartSlice';
import { useDispatch,useSelector } from 'react-redux';
import { fetchproduct } from '../store/productSlice';
import { STATUSES } from '../store/productSlice';

const Products = () => {
    const dispatch = useDispatch();
   // const [ products, setproducts] = useState([]);
    const {data:products,status} = useSelector((state)=> state.product);

    useEffect(() =>{
       dispatch(fetchproduct());
    },[])

    const handleAdd = (product)=>{
      dispatch(add(product));
    }

    if(status=== STATUSES.LOADING){
      return <h2>Loading....</h2>
    }

    if(status=== STATUSES.ERROR){
      return <h2>Something went wrong</h2>
    }
  return (
    <div className='productsWrapper'>
      {products.map(product =>(
           <div className='card' key={product.id}>
            <img src={product.image} alt=""/>
            <h4>{product.title}</h4>
            <h5>{product.price}</h5>
            <button className='btn' onClick={()=>handleAdd(product)}>Add to Cart</button>
             </div>
      )
      )}
    </div>
  )
}

export default Products
