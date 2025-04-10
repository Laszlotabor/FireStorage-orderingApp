export interface Item {
  id?: string; // Firestore will generate this automatically for each item document
  name: string;
  quantity: number;
  quantityOrdered: number;
  orderedYet: boolean; // Tracks whether the item is ordered
}
