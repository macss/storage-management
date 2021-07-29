import React, { useState, useEffect } from "react";
import { Compartment, Deposit, History, Item, User } from "../../models";
import Services from "../../services/firebaseServices";
import { useAppSelector } from "../hooks";

interface DataModel {
  compartments: {
    [key: string]: Compartment;
  };
  deposits: {
    [key: string]: Deposit;
  };
  histories: {
    [key: string]: History;
  };
  items: {
    [key: string]: Item;
  };
  users: {
    [key: string]: User;
  };
}

const Main = () => {
  const [data, setData] = useState<DataModel | null>(null);
  const data2 = useAppSelector((state) => state);

  useEffect(() => {
    Services.listenToDb((data) => setData(data), "/");
  }, []);

  if (data) {
    const userKeys = Object.keys(data.users);
    const depositKeys = Object.keys(data.deposits);

    return (
      <React.Fragment>
        <p>Depósitos</p>
        <ul>
          {depositKeys.map((k1) => {
            const deposit = data.deposits[k1];
            const compartmentKeys = Object.keys(deposit.compartments);

            return (
              <li key={k1}>
                {deposit.name} [Criado:{" "}
                {new Date(deposit.created_at).toLocaleString()}]
                {compartmentKeys.length > 0 && (
                  <React.Fragment>
                    <p>Compartimentos: </p>
                    <ul>
                      {compartmentKeys.map((k2) => {
                        const compartment = data.compartments[k2];
                        const itemKeys = Object.keys(compartment.items);

                        return (
                          <li key={k2}>
                            {compartment.location} [Criado:{" "}
                            {new Date(compartment.created_at).toLocaleString()}]
                            {itemKeys.length > 0 && (
                              <React.Fragment>
                                <p>Items: </p>
                                <ul>
                                  {itemKeys.map((k3) => {
                                    const item = data.items[k3];

                                    return (
                                      <li key={k3}>
                                        {compartment.items[item.id]}x{" "}
                                        {item.name}
                                      </li>
                                    );
                                  })}
                                </ul>
                              </React.Fragment>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </React.Fragment>
                )}
              </li>
            );
          })}
        </ul>

        <p>Usuários</p>
        <ul>
          {userKeys.map((key) => {
            const user = data.users[key];
            return (
              <li key={key}>
                {user.fullname} [Criado:{" "}
                {new Date(user.created_at).toLocaleString()}]
              </li>
            );
          })}
        </ul>
      </React.Fragment>
    );
  }

  return <div>Carregando...</div>;
};

export default Main;
