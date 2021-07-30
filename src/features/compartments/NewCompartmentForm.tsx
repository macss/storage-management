import { unwrapResult } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { Compartment } from '../../models'
import { addNewCompartment } from './compartmentsSlice'

const NewCompartmentForm = () => {
  const { deposit_id } = useParams<{ deposit_id: string }>()

  const [data, setData] = useState({
    active: true,
    location: '',
    deposit_id
  })

  const handleChange = (field: keyof typeof data) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setData((v) => ({
      ...v,
      [field]: e.target.value
    }))
  }

  const dispatch = useAppDispatch()
  const history = useHistory()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addNewCompartment((data as unknown) as Compartment))
      .then(unwrapResult)
      .then((data) => {
        if (data.code === 'addCompartment/success') {
          history.push(`/deposits/${deposit_id}`)
        }
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={data.location}
        onChange={handleChange('location')}
        placeholder="Localização"
        required
      />
      <br />
      <button type="submit">Confirmar Cadastro</button>
    </form>
  )
}

export default NewCompartmentForm
