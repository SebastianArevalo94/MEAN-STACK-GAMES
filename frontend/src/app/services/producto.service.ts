import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Juego } from '../models/Game';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  selectedGame = Juego
  juego:Juego[] = []
  url = 'http://localhost:5000/api/game/'

  constructor(private http: HttpClient, private router: Router) { }

  getJuegos(): Observable<any>{
    return this.http.get(this.url+'getAll')
  }

  eliminarJuego(id: string): Observable<any>{
    return this.http.delete(this.url + id)
  }
  
  guardarJuego(juego: Juego): Observable<any>{
    return this.http.post(this.url+"crear", juego);
  }
  
  obtenerJuego(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  editarProducto(id: string, juego: Juego): Observable<any>{
    return this.http.put(this.url + "editar" +  id, juego)
  }
}


