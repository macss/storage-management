import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Item } from '../../models'
import { itemTypes } from '../../models/Item'
import { selectItemById, updateItemInfo } from './itemsSlice'

const EditItemInfo = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const history = useHistory()
  const item = useAppSelector((state) => selectItemById(state, id))
  const [data, setData] = useState<Item>({
    name: '',
    sap_code: '',
    supplier_code: '',
    id: '',
    created_at: 1,
    type: 'outros',
    details: ''
  })

  useEffect(() => {
    if (item) setData(item as Item)
  }, [item])

  if (!item) return <div>Item não cadastrado.</div>

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(updateItemInfo(data))
      .then(unwrapResult)
      .then((result) => {
        if (result.code === 'updateData/success') {
          history.push(`/items/${id}`)
        }
      })
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
      <button type="submit">Salvar alterações</button>
    </form>
  )
}

export default EditItemInfo
