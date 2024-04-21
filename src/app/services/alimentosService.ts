import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlimentosService {

  constructor(private http: HttpClient) { }

  // Método para obtener todos los alimentos del catálogo
  obtenerAlimentos(): Observable<any> {
    return this.http.get<any>('https://run.mocky.io/v3/f21c74ff-a003-4c54-a748-bf3c3b4a794b');
  }

  // Método para agregar un nuevo alimento al catálogo
  agregarAlimento(nuevoAlimento: any): Observable<any> {
    return new Observable<any>();
}

  // Método para editar la información de un alimento existente en el catálogo
  editarAlimento(alimentoEditado: any): Observable<any> {
    const url = 'https://run.mocky.io/v3/f21c74ff-a003-4c54-a748-bf3c3b4a794b';
    return this.http.put<any>(url, alimentoEditado);
  }

  editarAlimentoMockyio(alimentoEditado: any): Observable<any> {
    const url = `https://run.mocky.io/v3/f21c74ff-a003-4c54-a748-bf3c3b4a794b/${alimentoEditado.id}`; 
    return this.http.put<any>(url, alimentoEditado);
  }

  // Método para eliminar un alimento del catálogo
  eliminarAlimento(id: string): Observable<any> {
    return this.http.delete<any>(`https://run.mocky.io/v3/f21c74ff-a003-4c54-a748-bf3c3b4a794b/${id}`);
  }
}
