import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { fetchCompartments } from "../../features/compartments/compartmentsSlice";
import DepositDetails from "../../features/deposits/DepositDetails";
import DepositsList from "../../features/deposits/DepositsList";
import { fetchDeposits } from "../../features/deposits/depositsSlice";
import { fetchHistories } from "../../features/histories/historiesSlice";
import ItemDetails from "../../features/items/ItemDetails";
import ItemsList from "../../features/items/ItemsList";
import { fetchItems } from "../../features/items/itemsSlice";
import NewItemForm from "../../features/items/NewItemForm";
import { fetchUsers } from "../../features/users/usersSlice";
import routes from "../../routes";
import { useAppDispatch } from "../hooks";
import Main from "../views/Main";

const TheContent = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCompartments());
    dispatch(fetchUsers());
    dispatch(fetchDeposits());
    dispatch(fetchHistories());
    dispatch(fetchItems());
  }, []);

  return (
    <Switch>
      <Route exact path="/main" component={Main} />
      <Route exact path="/deposits/list" component={DepositsList} />
      <Route exact path="/deposits/:id" component={DepositDetails} />
      <Route exact path="/items/new" component={NewItemForm} />
      <Route exact path="/items/list" component={ItemsList} />
      <Route exact path="/items/:id" component={ItemDetails} />
    </Switch>
  );

  return (
    <React.Suspense fallback={<div>Carregando...</div>}>
      <Switch>
        {routes.map((route, idx) => {
          <Route
            exact={route.exact}
            path={route.path}
            render={(props) => <route.component {...props} />}
            key={idx}
          />;
        })}
        <Redirect exact from="/" to={routes[0].path} />
      </Switch>
    </React.Suspense>
  );
};

export default TheContent;
