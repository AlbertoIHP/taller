
import { Router } from '@angular/router';
import { EventService } from './Services/events.service'
import { Component, ElementRef, ViewChild, Inject, OnInit } from '@angular/core'


import { Usuario } from './Models/Usuario.model'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  public isLogeado = false
  public currentUser: Usuario

  constructor(  public router: Router, public events : EventService)
  {



    this.currentUser = new Usuario()

    if( localStorage.getItem('userInfo') )
    {
      this.currentUser = JSON.parse(localStorage.getItem('userInfo'))
    }



    if( localStorage.getItem('currentUser') )
    {
      this.isLogeado = true
    }
    else
    {
      this.router.navigate(['login'])
    }


    this.events.isSingIn.subscribe( data => {
      this.currentUser = JSON.parse(localStorage.getItem('userInfo'))
      this.isLogeado = true
    } )

    this.events.isSingOut.subscribe( data => {
      this.isLogeado = false
    })

  }

  goHome()
  {
    this.router.navigate([''])
    this.events.clickProject()
  }

  goAdmin()
  {
    this.events.clickAdmin()
    this.router.navigate(['admin'])
  }

  singOut()
  {
    localStorage.clear()
    this.events.singOut()
    this.router.navigate(['login'])
  }
}
