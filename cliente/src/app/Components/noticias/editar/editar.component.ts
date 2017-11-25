import { Component, OnInit, Inject, ViewChild } from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { MatDatepicker, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import * as moment from 'moment'


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
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
    public dialogRef: MatDialogRef<EditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    )
  {
    this.isntSigthInfo = true
    this.isntGeneralInfo = true

    this.nuevaNoticia = data.noticia
    this.totalCategorias = data.categorias
    this.servicioNoticias = data.servicioNoticias

    this.userInfo = data.usuario


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

  editarNoticia()
  {
    console.log(this.nuevaNoticia)
    this.servicioNoticias.editNoticia(this.nuevaNoticia, this.nuevaNoticia.id).subscribe( data => {
      this.onNoClick()
    })
  }

}
