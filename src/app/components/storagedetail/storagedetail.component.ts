import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../../services/base.service';
import { Storage } from '../../interfaces/storage';
import { Item } from '../../interfaces/item';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-storagedetail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './storagedetail.component.html',
  styleUrl: './storagedetail.component.css',
})
export class StoragedetailComponent {
  storage$!: Observable<Storage | undefined>;
  storageId!: string;
  newItemName: string = '';

  constructor(
    private baseService: BaseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.paramMap.subscribe((params) => {
      this.storageId = params.get('id')!;
      if (this.storageId) {
        this.storage$ = this.baseService
          .getStorageById(this.storageId)
          .pipe(map((data) => data as Storage));
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/mystorages']);
  }

  addItem(): void {
    const trimmedName = this.newItemName.trim();
    if (!trimmedName) return;

    const newItem: Item = {
      name: trimmedName,
      quantity: 0,
      quantityOrdered: 0,
      orderedYet: false,
    };

    this.baseService
      .addItemToStorage(this.storageId, newItem)
      .then(() => {
        this.newItemName = '';
      })
      .catch((error) => console.error('Error adding item:', error));
  }
}
