import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { SeccionesComponent } from './components/secciones/secciones.component';
import { ProductosComponent } from './components/productos/productos.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/dataService';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FoteerComponent } from './components/foteer/foteer.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './components/auth.guard';
import { CarroCompraComponent } from './components/carro-compra/carro-compra.component';
import { HeaderComponent } from './components/header/header.component';
import { AdminComponent } from './components/admin/admin.component';
import { AgregarAlimentoComponent } from './components/agregar-alimento/agregar-alimento.component';
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';

const routes: Routes = [   
  { path: 'login', component: LoginComponent },
  { path: 'carrito', component: CarroCompraComponent },
  { path: '', component: MenuComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'listar-productos', component: ListarProductosComponent },   

];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SeccionesComponent,
    ProductosComponent,
    LoginComponent,
    FoteerComponent,
    CarroCompraComponent,
    HeaderComponent,
    AdminComponent,
    AgregarAlimentoComponent,
    ListarProductosComponent        
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule 
  ],
  exports: [RouterModule],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
