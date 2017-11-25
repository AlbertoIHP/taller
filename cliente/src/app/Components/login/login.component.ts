import { EventService } from '../../Services/events.service'

import { Component, ElementRef, ViewChild, Inject, OnInit } from '@angular/core'

import { Usuario } from '../../Models/Usuario.model'
import { UsuariosService } from '../../Services/usuarios.service'


import { AuthenticationService } from '../../Services/authentication.service'

import { CrearusuarioComponent } from '../crearusuario/crearusuario.component'

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: any
  private password: any
  private totalUsers: Usuario[]
  private arentFully = true

  constructor(
    public router: Router,
    private dialog: MatDialog,
    private usuarioService: UsuariosService,
    private events: EventService,
    private auth: AuthenticationService)
  {

    this.events.isSingOut.subscribe( data => {
      this.user = ''
      this.password = ''
    })

    this.events.isSingUp.subscribe( newUser => {
      this.user = newUser.email
      this.password = newUser.password
    } )

    this.totalUsers = []
    this.getUsers()

  }





  getUsers()
  {
    this.usuarioService.getUsuarios().subscribe( data => {
      this.totalUsers = this.normalizeData(data)
    })
  }

  normalizeData(todo : any)
  {
    return todo.data
  }

  ngOnInit() {
  }

  login()
  {
    this.auth.login(this.user, this.password).subscribe(data => {
      console.log(data)


      this.usuarioService.getUsuarios().subscribe(data => {
        this.totalUsers = this.normalizeData(data)

        var currentUser = this.totalUsers.filter( user => user.email === this.user)

        localStorage.setItem('userInfo', JSON.stringify(currentUser[0]) )
        this.events.singIn()
        this.router.navigate([''])

      })



    })

  }

  singUp()
  {

    let dialogRef = this.dialog.open(CrearusuarioComponent, {
      width: '1000px',
      data:
      {
       user: new Usuario(),
       usuarioService: this.usuarioService

      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }

  checkData()
  {
    if(this.user != '' && this.password != '')
    {
      this.arentFully = false
    }
    else
    {
      this.arentFully = true
    }
  }

}
