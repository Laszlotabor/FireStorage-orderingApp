import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manul',
  standalone: true,
  imports: [],
  templateUrl: './manul.component.html',
  styleUrl: './manul.component.css'
})
export class ManulComponent {

  constructor(private router:Router) { };

  goHome() {
    this.router.navigate(["/home"]);
   };

}
