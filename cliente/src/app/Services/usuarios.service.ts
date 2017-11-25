import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AuthenticationService } from './authentication.service';


import { Usuario } from '../Models/Usuario.model';
import { address } from './address'


@Injectable()
export class UsuariosService {
  public base: string = address+"/usuarios";
  public options: RequestOptions;
  public headers: Headers;

  constructor(private http: Http, private authenticationService: AuthenticationService)
  {
    this.setToken()
  }

  setToken()
  {
    this.headers = new Headers(
    {
      'Authorization': 'Bearer ' + this.authenticationService.token,
      'Content-Type': 'application/json'
    });

    this.options = new RequestOptions({ headers: this.headers });
  }

  getUsuarios(): Observable<Usuario[]>
  {
    this.setToken()
    return this.http.get(this.base, this.options).map((res: Response) => res.json());
  }

  registerUsuario(usuario: Usuario)
  {
    this.setToken()
    return this.http.post( this.base, JSON.stringify(usuario), this.options).map((res: Response) => res.json());

  }

  getUsuario(id) : Observable<Usuario>
  {
    this.setToken()
    return this.http.get(this.base+'/'+id, this.options).map((res: Response) => res.json());
  }

  editUsuario(usuario: Usuario, id: number)
  {
    this.setToken()
    return this.http.put(this.base+'/'+id, JSON.stringify(usuario), this.options).map((res: Response) => res.json());
  }

  deleteUsuario(id)
  {
    this.setToken()
    return this.http.delete(this.base+'/'+id, this.options).map((res: Response) => res.json());
  }


}

