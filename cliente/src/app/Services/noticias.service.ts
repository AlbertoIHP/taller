import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AuthenticationService } from './authentication.service';


import { Noticia } from '../Models/Noticia.model';
import { address } from './address'


@Injectable()
export class NoticiasService {
  public base: string = address+"/noticias";
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

  getNoticias(): Observable<Noticia[]>
  {
    this.setToken()
    return this.http.get(this.base, this.options).map((res: Response) => res.json());
  }

  registerNoticia(noticia: Noticia)
  {
    this.setToken()
    return this.http.post( this.base, JSON.stringify(noticia), this.options).map((res: Response) => res.json());

  }

  getNoticia(id) : Observable<Noticia>
  {
    this.setToken()
    return this.http.get(this.base+'/'+id, this.options).map((res: Response) => res.json());
  }

  editNoticia(noticia: Noticia, id: number)
  {
    this.setToken()
    return this.http.put(this.base+'/'+id, JSON.stringify(noticia), this.options).map((res: Response) => res.json());
  }

  deleteNoticia(id)
  {
    this.setToken()
    return this.http.delete(this.base+'/'+id, this.options).map((res: Response) => res.json());
  }


}

