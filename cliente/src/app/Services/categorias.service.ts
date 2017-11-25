import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AuthenticationService } from './authentication.service';


import { Categoria } from '../Models/Categoria.model';
import { address } from './address'


@Injectable()
export class CategoriasService {
  public base: string = address+"/categorias";
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

  getCategorias(): Observable<Categoria[]>
  {
    this.setToken()
    return this.http.get(this.base, this.options).map((res: Response) => res.json());
  }

  registerCategoria(categoria: Categoria)
  {
    this.setToken()
    return this.http.post( this.base, JSON.stringify(categoria), this.options).map((res: Response) => res.json());

  }

  getCategoria(id) : Observable<Categoria>
  {
    this.setToken()
    return this.http.get(this.base+'/'+id, this.options).map((res: Response) => res.json());
  }

  editCategoria(categoria: Categoria, id: number)
  {
    this.setToken()
    return this.http.put(this.base+'/'+id, JSON.stringify(categoria), this.options).map((res: Response) => res.json());
  }

  deleteCategoria(id)
  {
    this.setToken()
    return this.http.delete(this.base+'/'+id, this.options).map((res: Response) => res.json());
  }


}

