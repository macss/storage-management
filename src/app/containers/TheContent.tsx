import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { fetchCompartments } from '../../features/compartments/compartmentsSlice'
import { fetchDeposits } from '../../features/deposits/depositsSlice'
import { fetchHistories } from '../../features/histories/historiesSlice'
import { fetchItems } from '../../features/items/itemsSlice'
import { fetchUsers } from '../../features/users/usersSlice'
import routes from '../../routes'
import FirebaseServices from '../../services/firebaseServices'
import { useAppDispatch } from '../hooks'

const TheContent = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCompartments())
    dispatch(fetchUsers())
    dispatch(fetchDeposits())
    dispatch(fetchHistories())
    dispatch(fetchItems())

    return () => {
      FirebaseServices.removeListeners()
    }
  }, [dispatch])

  return (
    <React.Suspense fallback={<div>Carregando...</div>}>
      <Switch>
        {routes.map((route, idx) => (
          <Route
            exact={route.exact}
            path={route.path}
            render={(props) => <route.component {...props} />}
            key={idx}
          />
        ))}
        <Redirect exact from="/" to={routes[0].path} />
      </Switch>
    </React.Suspense>
  )
}

export default TheContent
