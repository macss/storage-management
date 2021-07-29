import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectItemById } from "./itemsSlice";

const ItemDetails = ({ match }: RouteComponentProps<{ id: string }>) => {
  const { params } = match;
  const item = useAppSelector((state) => selectItemById(state, params.id));

  if (!item) {
    return <div>Item não cadastrado</div>;
  }

  return (
    <div>
      Nome: {item.name} <br />
      Cód. Sap: {item.sap_code} <br />
      Cód. Fornecedor: {item.supplier_code} <br />
    </div>
  );
};

export default ItemDetails;
