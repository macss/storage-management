import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectAllDeposits } from './depositsSlice'
import { Link } from 'react-router-dom'

const DepositsList = () => {
  const deposits = useAppSelector(selectAllDeposits)

  return (
    <ul>
      {deposits.map((deposit, idx) => {
        const compartments = deposit?.compartments
          ? Object.keys(deposit?.compartments).length
          : 0

        return (
          <li key={idx}>
            <Link to={`/deposits/${deposit.id}`}>{deposit.name}</Link> [
            {compartments} compartimento
            {compartments !== 1 && 's'}]
          </li>
        )
      })}
    </ul>
  )
}

export default DepositsList
