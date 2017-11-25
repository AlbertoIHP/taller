import { Component, ElementRef, ViewChild, Inject } from '@angular/core';

import { Router } from '@angular/router';

import { Categoria } from '../../Models/Categoria.model';
import { CategoriasService } from '../../Services/categorias.service';

import { Noticia } from '../../Models/Noticia.model';
import { NoticiasService } from '../../Services/noticias.service';

import { Usuario } from '../../Models/Usuario.model';
import { UsuariosService } from '../../Services/usuarios.service';

import { AgregarComponent } from './agregar/agregar.component';
import { EditarComponent } from './editar/editar.component';

//DATATABLE
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import { ExampleDatabase, ExampleDataSource } from '../Globals/datasource.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent {

  public totalCategorias: Categoria[];
  public totalUsuarios: Usuario[];
  public totalNoticias: Noticia[];
  public usuarioActual;

  displayedColumns = ['Acciones', 'Titular', 'Fecha', 'Categoria', 'Usuario'];


  //DATATABLE
  exampleDatabase;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;



  ngOnInit()
  {

    this.dataSource = new ExampleDataSource(new ExampleDatabase([]), this.paginator, this.sort, 'Noticia');
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        })


    this.exampleDatabase = []

  }

  isAllSelected(): boolean
  {
    if (!this.dataSource)
    {
      return false;
    }

    if (this.selection.isEmpty())
    {
      return false;
    }

    if (this.filter.nativeElement.value)
    {
      return this.selection.selected.length == this.dataSource.renderedData.length;
    }
    else
    {
      return this.selection.selected.length == this.exampleDatabase.data.length;
    }
  }

  masterToggle()
  {
    if (!this.dataSource) { return; }

    if (this.isAllSelected())
    {
      this.selection.clear();
    }
    else if (this.filter.nativeElement.value)
    {
      this.dataSource.renderedData.forEach(data => this.selection.select(data.id));
    }
    else
    {
      this.exampleDatabase.data.forEach(data => this.selection.select(data.id));
    }
  }

  actualizarNoticias()
  {
    this.servicioNoticias.getNoticias().subscribe( data => {
      this.totalNoticias = this.normalizeData(data)
      this.idToString()

      //DATATABLE
      this.exampleDatabase  = new ExampleDatabase(this.totalNoticias);

      this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort, 'Noticia');
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          })
    })
  }


  constructor(
    public servicioUsuario: UsuariosService,
    public servicioNoticias: NoticiasService,
    public servicioCategorias: CategoriasService,
    public dialog: MatDialog,
    public router: Router
    )
  {
    if( !(localStorage.getItem('currentUser')) )
    {
      this.router.navigate(['login'])
    }

    this.usuarioActual = JSON.parse(localStorage.getItem('userInfo'))
    this.totalNoticias = []
    this.totalUsuarios = []
    this.totalCategorias = []

    this.actualizarCategorias()


  }

  actualizarCategorias()
  {
    this.servicioCategorias.getCategorias().subscribe( data => {
      this.totalCategorias = this.normalizeData(data)
      this.actualizarUsuarios()
    })
  }

  actualizarUsuarios()
  {
    this.servicioUsuario.getUsuarios().subscribe( data => {
      this.totalUsuarios = this.normalizeData(data)
      this.actualizarNoticias()
    })
  }



  idToString()
  {
    for( let noticia = 0 ; noticia < this.totalNoticias.length ; noticia ++ )
    {
      let currentCategoria = this.totalCategorias.filter( categoria => categoria.id === parseInt(this.totalNoticias[noticia].categorias_id) )
      let currentUsuario = this.totalUsuarios.filter( usuario => usuario.id === parseInt(this.totalNoticias[noticia].usuarios_id) )

      this.totalNoticias[noticia].usuarios_id = currentUsuario[0].email
      this.totalNoticias[noticia].categorias_id = currentCategoria[0].descripcion


    }
  }

  normalizeData(data: any)
  {
    return data.data
  }

  agregacionNoticia()
  {
    let dialogRef = this.dialog.open(AgregarComponent, {
      width: '700px',
      data: {
        categorias: this.totalCategorias,
        usuario: this.usuarioActual,
        noticia: new Noticia(),
        servicioNoticias: this.servicioNoticias
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.actualizarCategorias()
    });
  }

  eliminarNoticia(noticia)
  {
    this.servicioNoticias.deleteNoticia(noticia.id).subscribe( data => {
      this.actualizarCategorias()
    })
  }

  stringToId(noticia)
  {
    let currentCategoria = this.totalCategorias.filter( categoria => categoria.descripcion === noticia.categorias_id )
    let currentUsuario = this.totalUsuarios.filter( usuario => usuario.email === noticia.usuarios_id )

    noticia.categorias_id = currentCategoria[0].id.toString()
    noticia.usuarios_id = currentUsuario[0].id.toString()

    return noticia
  }


  edicionNoticia(noticia)
  {
    var copiaNoticia = JSON.parse(JSON.stringify(noticia))
    copiaNoticia = this.stringToId(copiaNoticia)

    let dialogRef = this.dialog.open(EditarComponent, {
      width: '700px',
      data: {
        categorias: this.totalCategorias,
        noticia: copiaNoticia,
        servicioNoticias: this.servicioNoticias
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      this.actualizarCategorias()
    });
  }

}
