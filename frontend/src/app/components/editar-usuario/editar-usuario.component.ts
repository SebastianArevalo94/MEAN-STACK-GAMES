import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/User';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
})
export class EditarUsuarioComponent implements OnInit {
  titulo = 'Agregar Usuario';
  usersForm: FormGroup;
  id: string | null;
  base64 = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _userService: UserServiceService,
    private aRouter: ActivatedRoute
  ) {
    this.usersForm = this.fb.group({
      names: ['', Validators.required],
      lastNames: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: [Number, Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarUser() {
    const USER: User = {
      names: this.usersForm.get('names')?.value,
      lastNames: this.usersForm.get('lastNames')?.value,
      address: this.usersForm.get('address')?.value,
      email: this.usersForm.get('email')?.value,
      password: this.usersForm.get('password')?.value,
      role: this.usersForm.get('role')?.value,
      file: this.base64
    };
    if (this.id !== null) {
      this._userService.updateUser(this.id, USER).subscribe(
        (data) => {
          Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Usuario actualizado!',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/listarUsers']);
        },
        (error) => {
          console.log(error);
          this.usersForm.reset();
        }
      );
    } else {
      this._userService.signUp(USER).subscribe(
        (data) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario guardado!',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/listarUsers']);
        },
        (error) => {
          console.log('El usuario ya existe!');
          this.usersForm.reset();
        }
      );
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Usuario';
      this._userService.getUser(this.id).subscribe((data) => {
        this.usersForm.setValue({
          names: data.names,
          lastNames: data.lastNames,
          address: data.address,
          email: data.email,
          password: data.password,
          role: data.role,
        })
        this.base64 = data.file
      },
        (error) => {
          console.log('Hubo un error:', error)
        })
    }
  }

  loadImage(event: any) {
    let limit = 2 * 1024 * 1024;

    if (event[0].size <= limit) {
      this.base64 = event[0].base64;
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
