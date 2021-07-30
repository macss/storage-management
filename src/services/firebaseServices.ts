import firebase from 'firebase/app'
import { database } from '../config/firebaseConfig'
import { Compartment, Item, History, Deposit } from '../models'
import {
  FirebaseResponse,
  AddCompartmentCode,
  AddItemCode,
  AddItemToCompartmentCode,
  RemoveItemFromCompartmentCode,
  AddDepositCode,
  UpdateDataCode
} from '../utils/firebaseCodes'

class FirebaseServices {
  static activeListeners: firebase.database.Reference[] = []

  static async addDeposit(
    deposit: Deposit
  ): Promise<FirebaseResponse<AddDepositCode>> {
    const depositKey = database.ref('/deposits').push().key as string
    const updates: any = {}

    deposit.id = depositKey
    deposit.created_at = Date.now()

    updates[`/deposits/${depositKey}`] = deposit

    try {
      await database.ref().update(updates)
      return {
        code: 'addDeposit/success',
        message: 'Successfully added deposit.'
      }
    } catch (error) {
      return {
        code: 'addDeposit/failure',
        message: error.message
      }
    }
  }

  static async addItemToCompartment(info: {
    item_id: string
    compartment: Compartment
    quantity: string | number
  }): Promise<FirebaseResponse<AddItemToCompartmentCode>> {
    const historyKey = database.ref('/histories').push().key as string
    const updates: any = {}

    info.quantity = Number(info.quantity)

    const history: History = {
      amount: info.quantity,
      compartment_id: info.compartment.id,
      created_at: Date.now(),
      item_id: info.item_id,
      id: historyKey,
      user_id: 'u1',
      type: 'in'
    }

    const { compartment } = info
    const newQuantity =
      compartment.items && compartment.items[info.item_id]
        ? compartment.items[info.item_id] + info.quantity
        : info.quantity

    updates[`/histories/${historyKey}`] = history
    updates[`/compartments/${info.compartment.id}`] = {
      ...compartment,
      items: {
        ...compartment.items,
        [info.item_id]: newQuantity
      },
      histories: {
        ...compartment.histories,
        [historyKey]: true
      }
    }

    try {
      await database.ref().update(updates)
      return {
        code: 'addItemToCompartment/success',
        message: 'Successfully added item to compartment.'
      }
    } catch (error) {
      return {
        code: 'addItemToCompartment/failure',
        message: error.message
      }
    }
  }

  static async addNewCompartment(
    compartment: Compartment
  ): Promise<FirebaseResponse<AddCompartmentCode>> {
    const compartmentKey = database.ref('/compartments').push().key as string
    const updates: any = {}

    compartment.id = compartmentKey
    compartment.created_at = Date.now()

    updates[`/compartments/${compartmentKey}`] = compartment
    updates[
      `/deposits/${compartment.deposit_id}/compartments/${compartmentKey}`
    ] = true

    try {
      await database.ref().update(updates)
      return {
        code: 'addCompartment/success',
        message: 'Successfully added compartment.'
      }
    } catch (error) {
      return {
        code: 'addCompartment/failure',
        message: error.message
      }
    }
  }

  static async addNewItem(item: Item): Promise<FirebaseResponse<AddItemCode>> {
    const itemKey = database.ref('/items').push().key as string
    const updates: any = {}

    item.id = itemKey
    item.created_at = Date.now()
    item.sap_code = Number(item.sap_code)

    updates[`/items/${itemKey}`] = item

    try {
      await database.ref().update(updates)
      return {
        code: 'addItem/success',
        message: 'Successfully added item.'
      }
    } catch (error) {
      return {
        code: 'addItem/failure',
        message: error.message
      }
    }
  }

  static listenToDb(cb: (data: any) => void, local: string) {
    const ref = database.ref(local)

    const index = this.activeListeners.indexOf(ref)

    if (index === -1) {
      this.activeListeners.push(ref)
      ref.on('value', (snapshot) => {
        cb(snapshot.val())
      })
    } else {
      const newRef = this.activeListeners[index]
      newRef.on('value', (snapshot) => {
        cb(snapshot.val())
      })
    }
  }

  static async removeItemFromCompartment(info: {
    item_id: string
    compartment: Compartment
    quantity: string | number
  }): Promise<FirebaseResponse<RemoveItemFromCompartmentCode>> {
    const historyKey = database.ref('/histories').push().key as string
    const updates: any = {}

    info.quantity = Number(info.quantity)

    const history: History = {
      amount: info.quantity,
      compartment_id: info.compartment.id,
      created_at: Date.now(),
      item_id: info.item_id,
      id: historyKey,
      user_id: 'u1',
      type: 'out'
    }

    const { compartment } = info
    let newQuantity: number | null =
      compartment.items && compartment.items[info.item_id]
        ? compartment.items[info.item_id] - info.quantity
        : 0

    newQuantity = newQuantity <= 0 ? null : newQuantity

    updates[`/histories/${historyKey}`] = history
    updates[`/compartments/${info.compartment.id}`] = {
      ...compartment,
      items: {
        ...compartment.items,
        [info.item_id]: newQuantity
      },
      histories: {
        ...compartment.histories,
        [historyKey]: true
      }
    }

    try {
      await database.ref().update(updates)
      return {
        code: 'removeItemFromCompartment/success',
        message: 'Successfully removed item from compartment.'
      }
    } catch (error) {
      return {
        code: 'removeItemFromCompartment/failure',
        message: error.message
      }
    }
  }

  static removeListeners() {
    this.activeListeners.forEach((listener) => listener.off())
  }

  static async updateData(
    update: any
  ): Promise<FirebaseResponse<UpdateDataCode>> {
    try {
      await database.ref().update(update)
      return {
        code: 'updateData/success',
        message: 'Successfully updated data.'
      }
    } catch (e) {
      return {
        code: 'updateData/failure',
        message: e.message
      }
    }
  }
}

export default FirebaseServices
