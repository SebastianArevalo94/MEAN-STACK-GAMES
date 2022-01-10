import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  user:User[] = []
  url = `http://localhost:5000/auth/`

  constructor(private http: HttpClient, private router: Router) { }

  getAllUsers(): Observable<any>{
    return this.http.get(this.url+'getAll')
  }
  getUser(id: string): Observable<any> {
    return this.http.get(this.url + 'getOne'+ id);
  }
  updateUser(id: string, user:User ): Observable<any>{
    return this.http.put(this.url + "update" + id, user)
  }
  signUp(user: User){
    return this.http.post(this.url+ "signup", user)
  }
  deleteUser(id: string): Observable<any>{
    return this.http.delete(this.url +"delete"+ id)
  }

}
