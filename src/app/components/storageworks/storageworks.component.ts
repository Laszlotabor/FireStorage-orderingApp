import { Component } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Storage } from '../../interfaces/storage';
import { Router } from '@angular/router';



@Component({
  selector: 'app-storageworks',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './storageworks.component.html',
  styleUrl: './storageworks.component.css',
})
export class StorageworksComponent {
  storageName: string = '';
  creatorName: string = '';

  constructor(private baseService: BaseService, private router: Router) {}

  // Method to add a new storage
  addStorage() {
    // Prepare storage object
    const newStorage: Storage = {
      name: this.storageName,
      creatorId: this.creatorName, // Assuming creator name is used as an ID (if using Firebase Authentication, you would use the actual user ID)
      items: [], // Initially empty items list
      orders: [], // Initially empty items list
    };

    // Call service to create storage in Firestore
    this.baseService
      .createStorage(newStorage)
      .then(() => {
        alert('Storage created successfully!');
        this.resetForm();
      })
      .catch((error) => {
        console.error('Error creating storage:', error);
      });
  }
  // Method to reset form fields
  resetForm() {
    this.storageName = '';
    this.creatorName = '';
  }
}
