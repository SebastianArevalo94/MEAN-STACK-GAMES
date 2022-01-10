import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './tools/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';

import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/tokenInterceptor/token-interceptor.service';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';
import { ComprarProductoComponent } from './components/comprar-producto/comprar-producto.component';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { ProductosComponent } from './components/productos/productos.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    NavbarComponent,
    HomeComponent,
    CrearProductoComponent,
    ListarProductosComponent,
    ComprarProductoComponent,
    ListarUsuariosComponent,
    EditarUsuarioComponent,
    ProductosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AlifeFileToBase64Module
    
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
