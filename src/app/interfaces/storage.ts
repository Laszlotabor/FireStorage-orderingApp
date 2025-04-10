import { Item } from './item';

export interface Storage {
  id?: string; // Firestore will generate this automatically
  name: string;
  creatorId: string; // User ID from Firebase Authentication
  items: Item[]; // Inventory items
  orders: Item[]; // Inventory items
}
