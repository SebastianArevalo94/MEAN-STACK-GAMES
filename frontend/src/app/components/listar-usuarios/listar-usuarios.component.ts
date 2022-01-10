import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css'],
})
export class ListarUsuariosComponent implements OnInit {
  listUsers: User[] = [];

  constructor(private _userService: UserServiceService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this._userService.getAllUsers().subscribe(
      (data) => {
        this.listUsers = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteUser(id: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Estas seguro?',
        text: 'El usuario se eliminará!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this._userService.deleteUser(id).subscribe(
            (data) => {
              //this.toastr.error('El producto fue eliminado con éxito!', 'Producto Eliminado')
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Usuario eliminado!',
                showConfirmButton: false,
                timer: 1500,
              });
              this.getAllUsers();
            },
            (error) => {
              console.log(error);
            }
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Cancelado!',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }
}
