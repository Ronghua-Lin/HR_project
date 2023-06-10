import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-hr-navigation-bar',
  templateUrl: './hr-navigation-bar.component.html',
  styleUrls: ['./hr-navigation-bar.component.css'],
})
export class HRNavigationBarComponent {
  constructor(private router:Router){

  }
  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate([
      '/login'
    ]);
  }
}
