import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  isBrowser: boolean;
  signupUsers: any[] = [];
  signupObj: any = { userName: '', email: '', password: '' };
  loginobj: any = { userName: '', password: '', email: '' };

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      const localData = localStorage.getItem('signUpUsers'); // ✅ Fixed Key Name
      if (localData) {
        this.signupUsers = JSON.parse(localData);
      }
    }
  }

  onSignup(): void {
    if (this.isBrowser) {
      this.signupUsers.push({ ...this.signupObj }); // ✅ Avoid reference issues
      localStorage.setItem('signUpUsers', JSON.stringify(this.signupUsers));
    }
    
    // Reset form
    this.signupObj = { userName: '', email: '', password: '' };
  }

  onLogin(): void {
    if (!this.isBrowser) return;

    const isUserExist = this.signupUsers.find(
      (user) => user.userName === this.loginobj.userName && user.password === this.loginobj.password
    );

    if (isUserExist) {
      alert('User Login Successful');
      this.router.navigate(['movie']); // ✅ Ensure '/movie' route exists
    } else {
      alert('Wrong credentials');
    }
  }
}
