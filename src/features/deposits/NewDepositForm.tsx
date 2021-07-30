import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { Deposit } from "../../models";
import { addDeposit } from "./depositsSlice";

const NewDepositForm = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [data, setData] = useState<{ code: string; name: string }>({
    code: "",
    name: ""
  });

  const handleChange = (field: keyof typeof data) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setData((v) => ({
      ...v,
      [field]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addDeposit((data as unknown) as Deposit))
      .then(unwrapResult)
      .then((result) => {
        if (result.code === "addDeposit/success")
          history.push("/deposits/list");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Código do Depósito"
        value={data.code}
        onChange={handleChange("code")}
        required
      />{" "}
      <br />
      <input
        type="text"
        placeholder="Nome do depósito"
        value={data.name}
        onChange={handleChange("name")}
        required
      />{" "}
      <br />
      <button type="submit">Confirmar cadastro</button>
    </form>
  );
};

export default NewDepositForm;
