import { Component, OnInit } from '@angular/core';
//import { ToastrService } from 'ngx-toastr';
import { Juego } from 'src/app/models/Game';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css'],
})
export class ListarProductosComponent implements OnInit {
  listJuegos: Juego[] = [];
  constructor(
    private _productoService: ProductoService
  ) //private toastr: ToastrService
  {}

  ngOnInit(): void {
    this.obtenerJuegos();
  }

  obtenerJuegos() {
    this._productoService.getJuegos().subscribe(
      (data) => {
        //console.log(data);
        this.listJuegos = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminarJuego(id: any) {
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
        text: "El juego se eliminará!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this._productoService.eliminarJuego(id).subscribe(
            (data) => {
              //this.toastr.error('El producto fue eliminado con éxito!', 'Producto Eliminado')

              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Juego eliminado',
                showConfirmButton: false,
                timer: 1500,
              });

              this.obtenerJuegos();
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
