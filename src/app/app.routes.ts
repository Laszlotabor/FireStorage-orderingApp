import { Routes } from '@angular/router';
import { StorageworksComponent } from './components/storageworks/storageworks.component';
import { MystoragesComponent } from './components/mystorages/mystorages.component';
import { StoragedetailComponent } from './components/storagedetail/storagedetail.component';
import { ManulComponent } from './components/manul/manul.component';
import { HomeComponent } from './components/home/home.component';


export const routes: Routes = [
  { path: '', redirectTo: 'manul', pathMatch: 'full' }, // 👈 Default route
  { path: 'storageworks', component: StorageworksComponent },
  { path: 'mystorages', component: MystoragesComponent },
  { path: 'storagedetail/:id', component: StoragedetailComponent },
  { path: 'manul', component: ManulComponent },
  { path: 'home', component: HomeComponent },
];
