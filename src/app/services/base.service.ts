import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Item } from '../interfaces/item';
import { Storage } from '../interfaces/storage';
import { map, switchMap, Observable } from 'rxjs';
import { of, combineLatest } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(private firestore: AngularFirestore) {}

  // Create a new storage with initial items--------------------------------------------------------------------
  createStorage(storage: Storage) {
    return this.firestore.collection('storages').add(storage);
  }

  // Get all storages-------------------------------------------------------------------------------------------
  getStorages() {
    return this.firestore.collection('storages').snapshotChanges();
  }

  // Get a specific storage by ID------------------------------------------------------------------------
  getStorageById(storageId: string): Observable<Storage | undefined> {
    const storageDocRef = this.firestore
      .collection('storages')
      .doc<Storage>(storageId);

    return storageDocRef.snapshotChanges().pipe(
      switchMap((docSnapshot) => {
        if (!docSnapshot.payload.exists) return of(undefined);

        const data = docSnapshot.payload.data() as Storage;
        const id = docSnapshot.payload.id;

        const items$ = storageDocRef
          .collection<Item>('items')
          .valueChanges({ idField: 'id' });
        const orders$ = storageDocRef
          .collection<Item>('orders')
          .valueChanges({ idField: 'id' });

        return combineLatest([items$, orders$]).pipe(
          map(([items, orders]) => ({
            id,
            ...data,
            items,
            orders,
          }))
        );
      })
    );
  }

  // delete storage--------------------------------------------------------------------------------------
  deleteStorage(storageId: string) {
    return this.firestore.collection('storages').doc(storageId).delete();
  }

  // Add a new item to the storage-----------------------------------------------------------------------
  addItemToStorage(storageId: string, item: Item) {
    const storageRef = this.firestore.collection('storages').doc(storageId);
    return storageRef.collection('items').add(item);
  }

  // Remove item from storage----------------------------------------------------------------------------
  removeItemFromStorage(storageId: string, itemId: string) {
    const storageRef = this.firestore.collection('storages').doc(storageId);
    const itemRef = storageRef.collection('items').doc(itemId);
    return itemRef.delete();
  }
  // Add an item to the orders list----------------------------------------------------------------------
  addItemToOrder(storageId: string, itemId: string, quantity: number) {
    const storageRef = this.firestore.collection('storages').doc(storageId);
    const itemRef = storageRef.collection('items').doc(itemId);

    return itemRef
      .get()
      .toPromise()
      .then((doc) => {
        // Check if the document exists and is defined
        if (doc && doc.exists) {
          const item = doc.data() as Item;
          if (item) {
            // Update the item with isOrdered set to true and add the quantityOrdered
            return itemRef
              .update({
                isOrdered: true,
                quantityOrdered: item.quantityOrdered + quantity, // Add to existing quantityOrdered
              })
              .then(() => {
                return { success: true }; // Return a success response
              });
          } else {
            return { success: false, message: 'Item data is undefined' }; // Return failure response if item data is undefined
          }
        } else {
          console.error('Item document does not exist');
          return { success: false, message: 'Item document does not exist' }; // Return failure response if the document does not exist
        }
      })
      .catch((error) => {
        console.error('Error updating item:', error);
        return { success: false, message: error.message }; // Return failure response on error
      });
  }

  // Remove an item from the orders list---------------------------------------------------------------
  removeItemFromOrder(storageId: string, orderId: string) {
    const storageRef = this.firestore.collection('storages').doc(storageId);
    const orderRef = storageRef.collection('orders').doc(orderId);

    return orderRef
      .delete()
      .then(() => {
        console.log('Item removed from orders.');
        // Optionally, you could also update the item in the "items" collection to decrement the ordered quantity
      })
      .catch((error) => {
        console.error('Error removing item from order:', error);
        throw error;
      });
  }
}
