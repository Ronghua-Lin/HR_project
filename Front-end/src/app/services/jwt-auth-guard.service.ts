import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  constructor(private router:Router) {}

  // Information about the route and state of the router
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {


    const token = localStorage.getItem('token');

    if (!token) {
      alert('Please login first!');
      this.router.navigate([
        '/login']);
      return false;
    }

    return true;
  }
}
