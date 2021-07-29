import firebase from "firebase/app";
import { database } from "../config/firebaseConfig";

class Services {
  static activeListeners: firebase.database.Reference[] = [];

  static listenToDb(cb: (data: any) => void, local: string) {
    const ref = database.ref(local);

    const index = this.activeListeners.indexOf(ref);

    if (index === -1) {
      this.activeListeners.push(ref);
      ref.on("value", (snapshot) => {
        cb(snapshot.val());
      });
    } else {
      const newRef = this.activeListeners[index];
      newRef.on("value", (snapshot) => {
        cb(snapshot.val());
      });
    }
  }
}

export default Services;
