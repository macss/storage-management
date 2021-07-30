import { unwrapResult } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { Item } from '../../models'
import { itemTypes } from '../../models/Item'
import { addNewItem } from './itemsSlice'

const NewItemForm = () => {
  const [data, setData] = useState<{
    name: string
    sap_code: string
    supplier_code: string
    type: string
    details: string
  }>({
    name: '',
    sap_code: '',
    supplier_code: '',
    type: '',
    details: ''
  })
  const dispatch = useAppDispatch()
  const history = useHistory()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addNewItem((data as unknown) as Item))
      .then(unwrapResult)
      .then((data) => {
        if (data.code === 'addItem/success') {
          history.push(`/items/list`)
        }
      })
  }

  const handleChange = (field: keyof typeof data) => (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setData((v) => ({
      ...v,
      [field]: e.target.value
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleChange('name')}
        value={data.name}
        placeholder="Nome"
        required
      />{' '}
      <br />
      <input
        type="number"
        onChange={handleChange('sap_code')}
        value={data.sap_code}
        placeholder="Cód. SAP"
        max={9999999}
        min={Number('0000000')}
      />{' '}
      <br />
      <input
        type="text"
        onChange={handleChange('supplier_code')}
        value={data.supplier_code}
        placeholder="Cód. Fornecedor"
      />{' '}
      <br />
      <select required onChange={handleChange('type')} value={data.type}>
        <option value="">SELECIONE O TIPO DE ITEM</option>
        {itemTypes.map((type) => (
          <option value={type} key={type}>
            {type.toUpperCase()}
          </option>
        ))}
      </select>{' '}
      <br />
      <textarea
        placeholder="Observações"
        onChange={handleChange('details')}
        value={data.details}
      />
      <br />
      <button type="submit">Cadastrar</button>
    </form>
  )
}

export default NewItemForm
