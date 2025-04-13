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
    const itemRef = this.firestore
      .collection('storages')
      .doc(storageId)
      .collection('items')
      .doc<Item>(itemId);

    return itemRef.update({
      orderedYet: true,
      quantityOrdered: quantity,
    });
  }

  // Remove an item from the orders list---------------------------------------------------------------
  removeItemFromOrder(storageId: string, itemId: string) {
    const itemRef = this.firestore
      .collection('storages')
      .doc(storageId)
      .collection('items')
      .doc<Item>(itemId);

    return itemRef.update({
      orderedYet: false,
      quantityOrdered: 0,
    });
  }
  //------------------------------------------------------------------------------------------------
  updateItem(storageId: string, itemId: string, data: Partial<Item>) {
    return this.firestore
      .collection('storages')
      .doc(storageId)
      .collection<Item>('items')
      .doc(itemId)
      .update(data);
  }
}
