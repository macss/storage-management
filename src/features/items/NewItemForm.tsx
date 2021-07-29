import React, { useState } from "react";

const NewItemForm = () => {
  const [data, setData] = useState({
    name: "",
    sap_code: "",
    supplier_code: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  const handleChange = (field: keyof typeof data) => (e) => {
    console.log(e);
    setData((v) => ({
      ...v,
      [field]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleChange("name")}
        value={data.name}
        placeholder="Nome"
      />{" "}
      <br />
      <input
        type="text"
        onChange={handleChange("sap_code")}
        value={data.sap_code}
        placeholder="Cód. SAP"
      />{" "}
      <br />
      <input
        type="text"
        onChange={handleChange("supplier_code")}
        value={data.supplier_code}
        placeholder="Cód. Fornecedor"
      />{" "}
      <br />
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default NewItemForm;
