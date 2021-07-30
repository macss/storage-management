import React from "react";

const Main = React.lazy(() => import("./app/views/Main"));
const DepositsList = React.lazy(() =>
  import("./features/deposits/DepositsList")
);
const DepositDetails = React.lazy(() =>
  import("./features/deposits/DepositDetails")
);
const NewDepositForm = React.lazy(() =>
  import("./features/deposits/NewDepositForm")
);
const ItemsList = React.lazy(() => import("./features/items/ItemsList"));
const NewItemForm = React.lazy(() => import("./features/items/NewItemForm"));
const ItemDetails = React.lazy(() => import("./features/items/ItemDetails"));
const EditItemInfo = React.lazy(() => import("./features/items/EditItemInfo"));
const NewCompartmentForm = React.lazy(() =>
  import("./features/compartments/NewCompartmentForm")
);
const CompartmentDetails = React.lazy(() =>
  import("./features/compartments/CompartmentDetails")
);
const AddItemToCompartmentForm = React.lazy(() =>
  import("./features/items/AddItemToCompartmentForm")
);

interface Route {
  exact?: boolean;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  path: string;
  name: string;
}

const routes: Route[] = [
  {
    component: Main,
    exact: true,
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
    component: NewDepositForm,
    path: "/deposits/new",
    exact: true,
    name: "Cadastrar novo depósito"
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
  },
  {
    component: EditItemInfo,
    path: "/items/edit/:id",
    exact: true,
    name: "Editar informações"
  },
  {
    component: NewItemForm,
    path: "/items/new",
    exact: true,
    name: "Cadastrar novo item"
  },

  {
    component: AddItemToCompartmentForm,
    path: "/items/add/:compartment_id",
    exact: true,
    name: "Adicionar novo item"
  },
  {
    component: ItemDetails,
    path: "/items/:id",
    exact: true,
    name: "Itens Cadastrados"
  },
  {
    component: NewCompartmentForm,
    path: "/compartments/new/:deposit_id",
    exact: true,
    name: "Cadastrar novo compartimento"
  },
  {
    component: CompartmentDetails,
    path: "/compartments/:id",
    exact: true,
    name: "Detalhes"
  }
];

export default routes;
