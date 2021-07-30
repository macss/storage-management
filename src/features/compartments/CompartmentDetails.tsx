import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectDepositById } from '../deposits/depositsSlice'
import { selectCompartmentById } from './compartmentsSlice'
import { selectItemsFromCompartment } from '../items/itemsSlice'
import { Compartment } from '../../models'
import RenderHistories from '../histories/RenderHistories'

const CompartmentDetails = () => {
  const { id } = useParams<{ id: string }>()
  const compartment = useAppSelector((state) =>
    selectCompartmentById(state, id)
  )
  const deposit = useAppSelector((state) =>
    selectDepositById(state, compartment ? compartment.deposit_id : '')
  )
  const compartmentItems = useAppSelector((state) =>
    selectItemsFromCompartment(state, compartment as Compartment)
  )

  if (!compartment) return <div>Compartimento não cadastrado</div>
  return (
    <div>
      Criado: {new Date(compartment.created_at).toLocaleDateString()} <br />{' '}
      <br />
      Ativo: {compartment.active ? 'Sim' : 'Não'} <br />
      Depósito: {deposit ? deposit.name : 'Não possui depósito'} <br />
      Localização:{' '}
      {deposit
        ? compartment.location.toUpperCase()
        : 'Não possui depósito'}{' '}
      {compartment.items &&
        compartmentItems.map((item, k) => (
          <div key={item.id}>
            {k === 0 && (
              <span>
                <br /> <br />
                Items <br />
              </span>
            )}
            {compartment.items[item.id]}x {item.name}
          </div>
        ))}
      <br />
      <br />
      Histórico <br />
      <RenderHistories compartment={compartment} />
    </div>
  )
}

export default CompartmentDetails
