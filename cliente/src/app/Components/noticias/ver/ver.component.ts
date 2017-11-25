import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css']
})
export class VerComponent implements OnInit {
  private noticia: any

  constructor( public router: Router )
  {

    if( !(localStorage.getItem('currentUser'))  )
    {
      this.router.navigate(['login'])
    }

    if( !(localStorage.getItem('noticia')) )
    {
      this.router.navigate([''])
    }


    this.noticia = JSON.parse( localStorage.getItem('noticia') )
  }

  ngOnInit() {
  }

}
