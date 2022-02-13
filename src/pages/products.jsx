import React, { useContext, useEffect, useState } from 'react';
import PrimaryButton from "../components/Button/Button";
import Modal from "../components/Modal/Modal";
import { GlobalContext } from '../context/globalContext';
import fetchApi from '../utils/fetchApi';

/**
 * Goal:
 * 1. Accessing REST API in all browers and even in older versions
 * 2. axios object provides abstraction for all methods
 * 3. axios.get('')
 * 4. REST API structure
 *  1. GET - /products - fetch all products
 *  2. POST - /products - Create a new product
 *  3. PATCH/PUT - /products/:id - update product detail
 *  4. DELETE - /products/:id - deletes a product
 *  5. GET (specific product) = /products/:id - returns requested product
 */

const ProductsPage = () => {
  const data = useContext(GlobalContext)
  const [showModal, setShowModal] = useState(false)
  const [products, setProducts] = useState([])
  const [reviews, setReviews] = useState([])
  const [formData, setFormData] = useState({})

  useEffect(() => {
    getProducts();
    fetchApi.get('/reviews')
      .then(res => {
        setReviews(res.data);
      })
      .catch(e => {
        console.log('Products Page > ', e)
      })
  }, [])

  const getProducts = () => {
    fetchApi.get('/products')
      .then(res => {
        setProducts(res.data);
      })
      .catch(e => {
        console.log('Products Page > ', e)
      })
  }

  const onInputChange = e => {
    setFormData(oldState => {
      return {
        ...oldState,
        [e.target.name]: e.target.value
      }
    })
  }

  const onAddProduct = () => {
    if(formData.name) {
      fetchApi.post('/products', {
        name: formData.name,
        desc: formData.desc,
        image: formData.image,
      })
      .then(res => {
        getProducts();
        setShowModal(false)
        setFormData({})
      })
      .catch(e => {
        console.log('Product Add Err >', e)
      })
    }
  }

  const onUpdateProduct = () => {
    if(formData.name && formData.id) {
      fetchApi.patch(`/products/${formData.id}`, {
        name: formData.name,
        desc: formData.desc,
        image: formData.image,
      })
      .then(res => {
        getProducts();
        setShowModal(false)
        setFormData({})
      })
      .catch(e => {
        console.log('Product Add Err >', e)
      })
    }
  }

  const onDeleteProduct = itemId => {
    fetchApi.delete(`/products/${itemId}`)
      .then(res => {
        console.log(res);
        getProducts();
      })
      .catch(e => {
        console.log(e)
      })
  }

  const onEditProduct = (item) => {
    setFormData(item);
    setShowModal(true)
  }

  return (
    <div style={{height: "100vh"}}>
      <h1 className='my-2'>Products Page</h1>

      <PrimaryButton onClick={() => setShowModal(true)}>
        Add Product
      </PrimaryButton>
      <div className='my-2'>
        {
          products.map(item => {
            return (
              <div key={item.id} className='inline-block p-5'>
                <img src={item.image} style={{ height: 50, width: 'auto' }} />
                <p>{item.name}</p>
                <p>{item.desc}</p>
                <PrimaryButton className='mr-2 text-sm' onClick={() => onEditProduct(item)}>✎ Edit</PrimaryButton>
                <PrimaryButton className='text-sm' onClick={() => onDeleteProduct(item.id)}>🗑 Delete</PrimaryButton>
              </div>
            )
          })
        }
        {
          reviews.map(item => {
            return <div key={item.id}>{item.comments}</div>
          })
        }
      </div>
      <Modal title={formData.id ? 'Edit Product' : 'Add Product'} open={showModal}>
        <div className='flex direction-column my-2'>
          <input className='border' type={'text'} value={formData.name} name='name'  placeholder='Name' onChange={onInputChange} />
          <input className='border' type={'text'} value={formData.desc} name='desc'  placeholder='Desc' onChange={onInputChange} />
          <input className='border' type={'text'} value={formData.image} name='image' placeholder='Image url'  onChange={onInputChange} />
          {
            formData.id ? 
              <PrimaryButton className='mx-2' onClick={onUpdateProduct}>Update</PrimaryButton>
              : <PrimaryButton className='mx-2' onClick={onAddProduct}>Add</PrimaryButton>
          }
        </div>
        <PrimaryButton className='my-2' onClick={() => {setFormData({}); setShowModal(false)}}>
          Close
        </PrimaryButton>
      </Modal>
    </div>
  )
}

export default ProductsPage;
