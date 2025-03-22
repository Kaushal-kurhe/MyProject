import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/']); // Navigates to the home page
  }

  logout() {
    localStorage.removeItem('signUpUsers'); // Clears user session
    this.router.navigate(['/login']); // Navigates to login page
    console.log("logout")
  }
}
