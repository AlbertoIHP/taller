import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../Components/home/home.component'
import { VerComponent } from '../Components/noticias/ver/ver.component'
import { NoticiasComponent } from '../Components/noticias/noticias.component'
import { LoginComponent } from '../Components/login/login.component'

const routes: Routes =
[
  { path: '',  component: HomeComponent },
  { path: 'ver',  component: VerComponent },
  { path: 'admin',  component: NoticiasComponent },
  { path: 'login',  component: LoginComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);

