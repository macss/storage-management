import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { Compartment } from "../../models";
import { selectCompartmentByDeposit } from "../compartments/compartmentsSlice";
import { selectAllItems } from "../items/itemsSlice";
import { selectDepositById } from "./depositsSlice";

const DepositDetails = ({
  match,
  history
}: RouteComponentProps<{ id: string }>) => {
  const { params } = match;
  const deposit = useAppSelector((state) =>
    selectDepositById(state, params.id)
  );
  const compartments = useAppSelector((state) =>
    selectCompartmentByDeposit(state, params.id)
  );
  const allItems = useAppSelector(selectAllItems);

  if (!deposit) {
    return <h3>Depósito não encontrado!</h3>;
  }

  return (
    <div>
      <h3>{deposit.name}</h3>
      <h4>
        {compartments.length} compartimento
        {compartments.length !== 1 && "s"}{" "}
      </h4>
      {compartments.map((compartment: Compartment) => {
        const itemKeys = Object.keys(compartment.items);
        const s = itemKeys.length !== 1 && "s";

        return (
          <React.Fragment key={compartment.id}>
            <h5>
              {compartment.location} [{itemKeys.length} item{s} distinto{s}]
            </h5>
            {itemKeys.map((ik) => {
              const [item] = allItems.filter((item) => item.id === ik);
              return (
                <Link to={`/items/${item.id}`}>
                  <small>{`${compartment.items[ik]}x ${item.name}`}</small>
                </Link>
              );
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default DepositDetails;
