export const itemTypes = [
  'eletrônicos',
  'equipamento',
  'peça',
  'outros'
] as const

interface Item {
  created_at: number
  id: string
  name: string
  sap_code?: string | number
  supplier_code?: string
  type: typeof itemTypes
  details?: string
}

export default Item
