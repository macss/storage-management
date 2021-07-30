import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Compartment, Item } from "../../models";
import { selectCompartmentByDeposit } from "../compartments/compartmentsSlice";
import {
  addItemToCompartment,
  removeItemFromCompartment,
  selectAllItems
} from "../items/itemsSlice";
import { selectDepositById } from "./depositsSlice";

const DepositDetails = ({
  match,
  history
}: RouteComponentProps<{ id: string }>) => {
  const { params } = match;
  const dispatch = useAppDispatch();
  const deposit = useAppSelector((state) =>
    selectDepositById(state, params.id)
  );
  const compartments = useAppSelector((state) =>
    selectCompartmentByDeposit(state, params.id)
  );
  const allItems = useAppSelector(selectAllItems);

  const handleAddClick = (item_id: string, compartment: Compartment) => (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    dispatch(
      addItemToCompartment({
        item_id,
        compartment,
        quantity: 1
      })
    );
  };

  const handleRemoveClick = (
    item_id: string,
    compartment: Compartment,
    quantity: number = 1
  ) => (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(
      removeItemFromCompartment({
        item_id,
        compartment,
        quantity
      })
    );
  };

  if (!deposit) {
    return <h3>Depósito não encontrado!</h3>;
  }

  return (
    <div>
      <h3>{deposit.name}</h3>
      <button onClick={() => history.push(`/compartments/new/${params.id}`)}>
        Cadastrar Compartimento
      </button>
      <h4>
        {compartments.length} compartimento
        {compartments.length !== 1 && "s"}{" "}
      </h4>
      {compartments.map((compartment) => {
        const itemKeys = compartment.items
          ? Object.keys(compartment.items)
          : [];
        const s = itemKeys && itemKeys.length !== 1 && "s";

        return (
          <React.Fragment key={compartment.id}>
            <h5>
              {compartment.location.toUpperCase()} [{itemKeys.length} item{s}{" "}
              distinto{s}]{" "}
              <button
                onClick={() => history.push(`/compartments/${compartment.id}`)}
              >
                + informações
              </button>{" "}
              <button
                onClick={() => history.push(`/items/add/${compartment.id}`)}
              >
                Adicionar item
              </button>
            </h5>
            {itemKeys.length > 0 &&
              itemKeys.map((ik) => {
                const [item] = allItems.filter(
                  (item) => item.id === ik
                ) as Item[];
                return (
                  <span key={ik}>
                    <Link to={`/items/${item?.id}`}>
                      <small>{`${compartment?.items[ik]}x ${item?.name}`}</small>
                    </Link>{" "}
                    <button onClick={handleRemoveClick(item?.id, compartment)}>
                      -
                    </button>{" "}
                    <button onClick={handleAddClick(item?.id, compartment)}>
                      +
                    </button>{" "}
                    <button
                      onClick={handleRemoveClick(
                        item?.id,
                        compartment,
                        compartment?.items[ik]
                      )}
                    >
                      Remover Todos
                    </button>
                    <br />
                  </span>
                );
              })}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default DepositDetails;
