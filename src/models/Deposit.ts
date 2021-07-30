interface Deposit {
  code: string
  compartments?: {
    [key: string]: boolean
  }
  created_at: number
  id: string
  name: string
}

export default Deposit
