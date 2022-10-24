import { useState } from "react"
import { IProduct } from "../models"
import axios from 'axios'
import { ErrorMessage } from "./ErrorMessage"

const productData:IProduct =  {
  title: '',
  price: '',
  description: 'lorem ipsum set',
  image: 'https://i.pravatar.cc',
  category: 'electronic',
  rating: {
    rate: 42,
    count: 10
  }
}

interface CreateProductProps{
  onCreate: (product:IProduct) => void
}

export function CreateProduct({onCreate}:CreateProductProps) {

  const [valueTitle, setValueTitle] = useState('')
  const [valuePrice, setValuePrice] = useState('')
  const [valueDescription, setValueDescription] = useState('')
  const [valueRate, setValueRate] = useState('')

  const [error, setError] = useState('')

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    if(valueTitle.trim().length === 0){
      setError('Please enter title')
      return
    }

    productData.title = valueTitle
    productData.price = valuePrice
    productData.description = valueDescription
    productData.rating.rate = valueRate
    const response = await axios.post<IProduct>('https://fakestoreapi.com/products', productData)
  
    
    onCreate(response.data)
  }

  const changeHandlerTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueTitle(event.target.value)
  }

  const changeHandlerPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValuePrice(event.target.value)
  }
  
 const changeHandlerDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueDescription(event.target.value)
  }

  const changeHandlerRate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueRate(event.target.value)
  }

  return(
    <form onSubmit={submitHandler}>
      <input
      type='text'
      className='border py-2 px-4 mb-2 w-full outline-0 '
      placeholder='Enter product title...'
      value={valueTitle}
      onChange={changeHandlerTitle}
      />

    <input
      type='text'
      className='border py-2 px-4 mb-2 w-full outline-0 '
      placeholder='Enter product price...'
      value={valuePrice}
      onChange={changeHandlerPrice}
      />

    <input
      type='text'
      className='border py-2 px-4 mb-2 w-full outline-0 '
      placeholder='Enter product description...'
      value={valueDescription}
      onChange={changeHandlerDescription}
      />
      <input
        type='text'
        className='border py-2 px-4 mb-2 w-full outline-0 '
        placeholder='Enter product description...'
        value={valueRate}
        onChange={changeHandlerRate}
      />

      {error && <ErrorMessage error={error} />} 

      <button className='py-2 px-4 border bg-yellow-400 hover:text-white'>Create</button>
    </form>
  )
}