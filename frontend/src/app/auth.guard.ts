import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service'
import { Router } from '@angular/router'
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  userToken: any
  decodedToken: any

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true
    } else {
      this.router.navigate(['/signin'])
      return false
    }
  }

  canActivate2(): boolean {
    if (this.authService.loggedIn()) {
      this.userToken = localStorage.getItem('token')
      this.decodedToken = jwt_decode(this.userToken)
      if (this.decodedToken.role !== 1) {
        return false
      } else {
        return true
      }
    } else {
      this.router.navigate(['/signin'])
      return false
    }
  }


}
