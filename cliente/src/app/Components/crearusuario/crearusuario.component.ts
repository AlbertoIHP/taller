
import { UsuariosService } from '../../Services/usuarios.service'
import { Usuario } from '../../Models/Usuario.model'
import { Component, OnInit, Inject, ViewChild } from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { MatDatepicker, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import * as moment from 'moment'

@Component({
  selector: 'app-crearusuario',
  templateUrl: './crearusuario.component.html',
  styleUrls: ['./crearusuario.component.css']
})
export class CrearusuarioComponent implements OnInit {
  private nuevoUsuario: Usuario
  private fullInfo = true

  constructor(
    public servicioUsuario: UsuariosService,
    public dialogRef: MatDialogRef<CrearusuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    )
  {
    this.nuevoUsuario = new Usuario()
  }

  ngOnInit() {
  }

  onNoClick()
  {
    this.dialogRef.close();
  }

  registrarme()
  {
    this.servicioUsuario.registerUsuario(this.nuevoUsuario).subscribe( data => {
      alert('Usuario registrado')
      this.onNoClick()
    })
  }

  checking()
  {
    if( this.nuevoUsuario.email != '' && this.nuevoUsuario.password != '' && this.nuevoUsuario.nombre != '' )
    {
      this.fullInfo = false
    }
    else
    {
      this.fullInfo = true
    }
  }
}
