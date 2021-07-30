import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectItemById } from './itemsSlice'

const ItemDetails = ({
  match,
  history
}: RouteComponentProps<{ id: string }>) => {
  const { params } = match
  const item = useAppSelector((state) => selectItemById(state, params.id))

  if (!item) {
    return <div>Item não cadastrado</div>
  }

  return (
    <div>
      <button onClick={() => history.push(`/items/edit/${params.id}`)}>
        Editar Informações
      </button>{' '}
      <br />
      Nome: {item.name} <br />
      Tipo: {item.type} <br />
      Cód. Sap: {item.sap_code} <br />
      Cód. Fornecedor: {item.supplier_code} <br />
      Observações: {item.details} <br /> <br />
      Criado: {new Date(item.created_at).toLocaleString()}
    </div>
  )
}

export default ItemDetails
