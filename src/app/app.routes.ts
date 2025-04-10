import { Routes } from '@angular/router';
import { StorageworksComponent } from './components/storageworks/storageworks.component';
import { MystoragesComponent } from './components/mystorages/mystorages.component';
import { StoragedetailComponent } from './components/storagedetail/storagedetail.component';

export const routes: Routes = [
  { path: 'storageworks', component: StorageworksComponent },
  { path: 'mystorages', component: MystoragesComponent },
  { path: 'storagedetail/:id', component: StoragedetailComponent }
];
