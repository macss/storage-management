import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectAllItems } from "./itemsSlice";

const ItemsList = ({ history }: RouteComponentProps) => {
  const allItems = useAppSelector(selectAllItems);

  return (
    <div>
      <button onClick={() => history.push("/items/new")}>
        Cadastrar novo item
      </button>
      <table>
        <thead>
          <tr>
            <th>Nome do Item</th>
            <th />
            <th>Cód. SAP</th>
            <th />
            <th>Cód. Fornecedor</th>
          </tr>
        </thead>
        <tbody>
          {allItems.length > 0 &&
            allItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td />
                <td>{item.sap_code}</td>
                <td />
                <td>{item.supplier_code}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemsList;
