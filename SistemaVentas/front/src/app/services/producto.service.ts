import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GLOBAL} from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
public url;

  constructor(private _http: HttpClient, ) { 
    this.url = GLOBAL.url;
  }

  get_productos(filtro):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'/productos/'+filtro, {headers:headers});
  }

  get_categorias():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'/categorias/', {headers:headers});
  }

  post_productos(dato){
    const fd = new FormData();
    fd.append('titulo', dato.titulo);
    fd.append('descripcion', dato.descripcion);
    fd.append('imagen', dato.imagen);
    fd.append('precio_compra', dato.precio_compra);
    fd.append('precio_venta', dato.precio_venta);
    fd.append('stock', dato.stock);
    fd.append('idcategoria', dato.idcategoria);
    fd.append('idcategoria', dato.puntos);
    return this._http.post(this.url+'/producto/registrar',fd);
  }
  
}
