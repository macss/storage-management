import { unwrapResult } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectCompartmentById } from '../compartments/compartmentsSlice'
import { addItemToCompartment, selectAllItems } from './itemsSlice'

const AddItemToCompartment = () => {
  const { compartment_id } = useParams<{ compartment_id: string }>()
  const compartment = useAppSelector((state) =>
    selectCompartmentById(state, compartment_id)
  )

  const allItems = useAppSelector(selectAllItems)
  const dispatch = useAppDispatch()
  const history = useHistory()

  const [data, setData] = useState({
    item_id: '',
    quantity: '',
    compartment
  })

  const handleChange = (field: keyof typeof data) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setData((v) => ({
      ...v,
      [field]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (data.compartment !== undefined) {
      dispatch(addItemToCompartment(data))
        .then(unwrapResult)
        .then((result) => {
          if (result.code === 'addItemToCompartment/success')
            history.push(`/deposits/${compartment?.deposit_id}`)
        })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <select required value={data.item_id} onChange={handleChange('item_id')}>
        <option value="">SELECIONAR O ITEM</option>
        {allItems.map((item) => (
          <option value={item.id} key={item.id}>
            {item.name} [{String(item.type).toUpperCase()}]
          </option>
        ))}
      </select>{' '}
      <br />
      <input
        type="number"
        value={data.quantity}
        min={1}
        onChange={handleChange('quantity')}
        required
      />
      <br />
      <button type="submit">Confirmar</button>
    </form>
  )
}

export default AddItemToCompartment
