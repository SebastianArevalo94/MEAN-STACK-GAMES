import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userToken: any;
  decodedToken: any;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.roleType();
  }

  roleType() {
    this.userToken = this.authService.getToken();
    if (this.userToken) {
      this.decodedToken = jwt_decode(this.userToken);
      if (this.decodedToken.role !== 1) {
        return false;
      } else {
        return true;
      }
    }
  }
}
