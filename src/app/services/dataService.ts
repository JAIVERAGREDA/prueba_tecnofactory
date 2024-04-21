import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class DataService {
 
  constructor(private http: HttpClient) { }
 
  getDataTiposAlimentos(): Observable<any> {
    return this.http.get<any>('https://run.mocky.io/v3/8196359f-583d-4c2e-ae3f-8ee1cf7c1d06');
  }
  getDataProductos(): Observable<any> {
    return this.http.get<any>('https://run.mocky.io/v3/3f330c82-aadd-4c60-8863-cab07524f3dc');
  }
}