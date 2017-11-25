import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Noticia } from '../../Models/Noticia.model'
import { NoticiasService } from '../../Services/noticias.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private totalNoticias: Noticia[]

  constructor( public router: Router, private servicioNoticia: NoticiasService)
  {


    if( !(localStorage.getItem('currentUser')) )
    {
      this.router.navigate(['login'])
    }

    if( localStorage.getItem('noticia') )
    {
      localStorage.removeItem('noticia')
    }



    this.totalNoticias = []
    this.servicioNoticia.getNoticias().subscribe( data => {
      this.totalNoticias = this.normalizeData(data)
    })
  }

  normalizeData(data : any)
  {
    return data.data
  }

  ngOnInit() {
  }


  verNoticia(noticia)
  {
    localStorage.setItem('noticia', JSON.stringify(noticia))
    this.router.navigate(['ver'])
  }
}
