import { Component, OnInit } from '@angular/core';
import { Juego } from 'src/app/models/Game';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listJuegos: Juego[] = [];
  
  constructor(public _productoService: ProductoService) { }

  ngOnInit(): void {
    //this.getAllMenus()
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
}
