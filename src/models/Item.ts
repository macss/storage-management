const itemTypes = ["equipamento", "peça", "outros"] as const;

interface Item {
  created_at: number;
  id: string;
  name: string;
  sap_code: number;
  supplier_code: string;
  type: typeof itemTypes;
}

export default Item;
