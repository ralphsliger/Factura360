import { Component, OnInit } from '@angular/core';
import * as EventEmitter from 'events';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from '../../../models/producto';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-producto-create',
  templateUrl: './producto-create.component.html',
  styleUrls: ['./producto-create.component.css']
})
export class ProductoCreateComponent implements OnInit {
  public producto;
  public file: File;
  public imgSelect : String | ArrayBuffer ;
  public categorias;
  public is_save;
  public is_error;

  constructor(private _productoService: ProductoService) {
    this.producto= new Producto('','','','',0,0,0,'',0);
   }

  ngOnInit(): void {
    this._productoService.get_categorias().subscribe(
      response=>{
        this.categorias = response.categorias;
      }, error=>{}
    );
  }

  error_alert(){
    this.is_error= '';

  }
  succes_alert(){
    this.is_save= '';
  }

  onSubmit(productoForm){
    if(productoForm.valid){
      this._productoService.post_productos(
        {
        titulo: productoForm.value.titulo,
        descripcion: productoForm.value.descripcion,
        imagen: this.file,
        precio_compra: productoForm.value.precio_compra,
        precio_venta:   productoForm.value.precio_venta,
        stock:  productoForm.value.stock,
        idcategoria: productoForm.value.puntos,
      }).subscribe(response=>{
        this.is_save = 'se registro el producto con exito';
        this.producto= new Producto('','','','',0,0,0,'',0);
        this.imgSelect= '../../../assets/img/default.jpeg';
      },error=>{

      })
    }else{
      this.is_error= 'Complete correctamente el formulario';
    
    }
  }

  imgSelected(event: HtmlInputEvent){
    if(event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imgSelect = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

}
