import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HRAuthGuardService {
  // constructor(private route: ActivatedRoute){}
    


  // role:string|null=this.route.snapshot.paramMap.get('role');

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    const role:string|null =localStorage.getItem('role');

    if (role!=='HR') {
      alert('you are not HR!!!');
      return false;
    }

    return true;
  }


}
