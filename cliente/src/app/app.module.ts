//MODULOS
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './Router/router.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';

//Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { NoticiasComponent } from './Components/noticias/noticias.component';
import { AgregarComponent } from './Components/noticias/agregar/agregar.component';
import { EditarComponent } from './Components/noticias/editar/editar.component';
import { VerComponent } from './Components/noticias/ver/ver.component';
import { LoginComponent } from './Components/login/login.component';
import { CrearusuarioComponent } from './Components/crearusuario/crearusuario.component';


//Servicios
import { AuthenticationService} from './Services/authentication.service';
import { EventService} from './Services/events.service';
import { UsuariosService} from './Services/usuarios.service';
import { CategoriasService} from './Services/categorias.service';
import { NoticiasService} from './Services/noticias.service';



@NgModule({
  declarations:
  [
    AppComponent,
    HomeComponent,
    NoticiasComponent,
    AgregarComponent,
    EditarComponent,
    VerComponent,
    LoginComponent,
    CrearusuarioComponent
  ],

    entryComponents:
  [
    AgregarComponent,
    EditarComponent,
    CrearusuarioComponent
  ],
  imports:
  [
    ReactiveFormsModule,
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  providers:
  [
    AuthenticationService,
    appRoutingProviders,
    EventService,
    UsuariosService,
    CategoriasService,
    NoticiasService
  ],
  bootstrap:
  [
  AppComponent
  ]
})
export class AppModule { }
