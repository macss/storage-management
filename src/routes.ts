import React from "react";

const Main = React.lazy(() => import("./app/containers/TheDrawer"));
const DepositsList = React.lazy(() =>
  import("./features/deposits/DepositsList")
);
const DepositDetails = React.lazy(() =>
  import("./features/deposits/DepositDetails")
);
const ItemsList = React.lazy(() => import("./features/items/ItemsList"));

interface Route {
  exact?: boolean;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  path: string;
  name: string;
}

const routes: Route[] = [
  {
    component: Main,
    path: "/main",
    name: "Principal"
  },
  {
    component: DepositsList,
    path: "/deposits/list",
    exact: true,
    name: "Depósitos"
  },
  {
    component: DepositDetails,
    path: "/deposits/:id",
    exact: true,
    name: "Detalhes do Depósito"
  },
  {
    component: ItemsList,
    path: "/items/list",
    exact: true,
    name: "Itens Cadastrados"
  }
];

export default routes;
