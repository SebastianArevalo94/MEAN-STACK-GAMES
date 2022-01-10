import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/models/Auth';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  }

  signup(userCreated: NgForm) {
    userCreated.value.file = this.authService.selectedAuth.file
    userCreated.value.role = 2
    this.authService.signup(userCreated.value).subscribe(
      (res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario creado',
          showConfirmButton: false,
          timer: 1000
        })
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home'])
        this.clean(userCreated)
      },
      (err) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'El usuario ya existe',
          showConfirmButton: false,
          timer: 1000
        })
        this.clean(userCreated)
      }
    )
  }

  clean(form?: NgForm) {
    if (form) {
      form.reset()
      this.authService.selectedAuth = new Auth()
    }
  }


  loadImage(event: any) {
    let limit = 2 * 1024 * 1024;

    if (event[0].size <= limit) {
      this.authService.selectedAuth.file = event[0].base64
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Imagen demasiado grande!',
        text: 'La imagen debe ser igual o inferior a 2mb',
        showConfirmButton: true,
      });
    }

  }

}
