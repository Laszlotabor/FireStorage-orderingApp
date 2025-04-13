import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterLink } from '@angular/router';
import * as bootstrap from 'bootstrap';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  constructor(private router: Router) { 
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.closeNavbar();
        }
      });
  };
  
  closeNavbar() {
    const navbarToggle = document.querySelector('.navbar-collapse');
    if (navbarToggle?.classList.contains('show')) {
      new bootstrap.Collapse(navbarToggle).toggle();
    }
  }
}
