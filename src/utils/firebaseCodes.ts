type status = 'success' | 'failure';

export type AddItemCode = `addItem/${status}`
export type AddDepositCode = `addDeposit/${status}`
export type AddCompartmentCode = `addCompartment/${status}`
export type AddItemToCompartmentCode = `addItemToCompartment/${status}`
export type RemoveItemFromCompartmentCode = `removeItemFromCompartment/${status}`
export type UpdateDataCode = `updateData/${status}`

export interface FirebaseResponse<T> {
  code: T,
  message: string
}