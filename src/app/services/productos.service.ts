import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
   }

  // tslint:disable-next-line: typedef
  private cargarProductos() {
    return new Promise( (resolve, reject) => {
      this.http.get('https://angular-html-5f495-default-rtdb.firebaseio.com/productos_idx.json')
            // tslint:disable-next-line: deprecation
            .subscribe((resp: Producto[]) => {
              this.productos = resp;
              this.cargando = false;
              resolve(0);
            });
    });

  }

  // tslint:disable-next-line: typedef
  getProducto(id: string) {
    return this.http.get(`https://angular-html-5f495-default-rtdb.firebaseio.com/productos/${id}.json`);
  }

  // tslint:disable-next-line: typedef
  buscarProducto( termino: string) {
    if (this.productos.length === 0){
      // cargar productos
      this.cargarProductos().then(() => {
        // ejecutar después de tener los productos
        // aplicar el filtro
        this.filtrarProductos(termino);
      });
    } else {
      // aplicar el filtro
      this.filtrarProductos(termino);
    }
  }

  // tslint:disable-next-line: typedef
  private filtrarProductos(termino: string){
    console.log(this.productos);
    this.productos = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if (prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf(termino) >= 0) {
        this.productosFiltrado.push(prod);
      }
    });
  }
}
