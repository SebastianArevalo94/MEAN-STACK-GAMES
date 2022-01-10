import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Juego } from 'src/app/models/Game';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  titulo = 'Agregar juego';
  id: string | null;
  base64 = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    //private toastr: ToastrService,
    private _productoService: ProductoService,
    private aRouter: ActivatedRoute
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      clasificacion: ['', Validators.required],
      genero: ['', Validators.required],
      plataforma: ['', Validators.required],
      precio: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarJuego() {
    //console.log(this.productoForm)

    //Instanciación del objeto
    const JUEGO: Juego = {
      nombre: this.productoForm.get('nombre')?.value,
      clasificacion: this.productoForm.get('clasificacion')?.value,
      genero: this.productoForm.get('genero')?.value,
      plataforma: this.productoForm.get('plataforma')?.value,
      precio: this.productoForm.get('precio')?.value,
      file: this.base64,
    };
    if (this.id !== null) {
      // Editar juego
      this._productoService.editarProducto(this.id, JUEGO).subscribe(
        (data) => {
          //this.toastr.info('El juego fue actualizado con éxito!', 'Juego Actualizado!');
          Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Juego actualizado!',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['/listar']);
        },
        (error) => {
          console.log(error);
          this.productoForm.reset();
        }
      );
    } else {
      // Agregar producto
      console.log(JUEGO);
      this._productoService.guardarJuego(JUEGO).subscribe(
        (data) => {
          //this.toastr.success('El juego fue registrado con éxito!', 'Juego Registrado!');
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Juego agregado!',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['/listar']);
        },
        (error) => {
          console.log(error);
          //this.productoForm.reset();
        }
      );
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar juego';
      this._productoService.obtenerJuego(this.id).subscribe((data) => {
        this.productoForm.setValue({
          nombre: data.nombre,
          clasificacion: data.clasificacion,
          genero: data.genero,
          plataforma: data.plataforma,
          precio: data.precio,
        });
        this.base64 = data.file;
      });
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
