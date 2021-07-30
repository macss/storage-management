interface History {
  amount: number
  compartment_id: string
  created_at: number
  id: string
  item_id: string
  type: 'in' | 'out'
  user_id: string
}

export default History
