import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './auth.guard';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component'
import { ComprarProductoComponent } from './components/comprar-producto/comprar-producto.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';


const routes: Routes = [
  {path: '', redirectTo: '/signin', pathMatch: 'full'},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'crear', component: CrearProductoComponent, canActivate: [AuthGuard]},
  {path: 'listar', component: ListarProductosComponent, canActivate: [AuthGuard]},
  {path: 'listarUsers', component: ListarUsuariosComponent, canActivate: [AuthGuard]},
  {path: 'update', component: EditarUsuarioComponent, canActivate: [AuthGuard]},
  {path: 'update/:id', component: EditarUsuarioComponent, canActivate: [AuthGuard]},
  {path: 'editar/:id', component: CrearProductoComponent, canActivate: [AuthGuard]},
  {path: 'comprar', component: ComprarProductoComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
