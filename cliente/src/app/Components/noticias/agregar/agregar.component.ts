import { Component, OnInit, Inject, ViewChild } from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { MatDatepicker, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import * as moment from 'moment'


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  firstFormGroup: FormGroup
  secondFormGroup: FormGroup
  private nuevaNoticia: any
  private totalCategorias: any
  private servicioNoticias: any
  private isntGeneralInfo: boolean
  private isntSigthInfo: boolean
  private userInfo: any


 constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    )
  {
    this.isntSigthInfo = true
    this.isntGeneralInfo = true

    this.nuevaNoticia = data.noticia
    this.totalCategorias = data.categorias
    this.servicioNoticias = data.servicioNoticias

    this.userInfo = data.usuario
    this.nuevaNoticia.usuarios_id = this.userInfo.id.toString()
    this.nuevaNoticia.fecha = moment().format('l')


  }

  onNoClick()
  {
    this.dialogRef.close();
  }


  checkGeneralInfo()
  {
    if( this.nuevaNoticia.titular != '' && this.nuevaNoticia.entrada != '' && this.nuevaNoticia.imagen != '' )
    {
      this.isntGeneralInfo = false
    }
    else
    {
      this.isntGeneralInfo = true
    }
  }

  checkSigthInfo()
  {
    if( this.nuevaNoticia.cuerpo != '' && this.nuevaNoticia.categorias_id != '' )
    {
      this.isntSigthInfo = false
    }
    else
    {
      this.isntSigthInfo = true
    }
  }

  ngOnInit()
  {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  agregarNoticia()
  {
    console.log(this.nuevaNoticia)
    this.servicioNoticias.registerNoticia(this.nuevaNoticia).subscribe( data => {
      this.onNoClick()
    })
  }

}
