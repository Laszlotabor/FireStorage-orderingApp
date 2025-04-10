import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { Storage } from '../../interfaces/storage';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';




@Component({
  selector: 'app-mystorages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mystorages.component.html',
  styleUrl: './mystorages.component.css',
})
export class MystoragesComponent {
  storages$: Observable<Storage[]>; // Observable to hold storages

  constructor(private baseService: BaseService, private router:Router) {
    this.storages$ = this.baseService.getStorages().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Storage;
          const id = a.payload.doc.id;
          return { id, ...data }; // Attach Firestore ID to Storage object
        })
      )
    ); // Fetch storages on component load
  }
  // Method to view storage detail on click
  viewStorageDetail(storageId: string) {
    // Navigate to the storage detail page with the storage ID
    this.router.navigate([`/storagedetail/${storageId}`]);
  }
  deleteStorage(storageId: string) {
    this.baseService
      .deleteStorage(storageId)
      .then(() => {
        console.log('Storage deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting storage:', error);
      });
  }
}
