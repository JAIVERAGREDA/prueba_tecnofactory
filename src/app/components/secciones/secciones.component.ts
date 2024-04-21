import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dataService';

@Component({
  selector: 'app-secciones',
  templateUrl:'./secciones.component.html',
  styleUrls: ['./secciones.component.css'],
})
export class SeccionesComponent implements OnInit {
 
  data:any = [];
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getSecciones();
  }

  getSecciones() {
    this.dataService.getDataTiposAlimentos().subscribe(
      (response) => {
        this.data = response.data.tipos;
        console.log('Datos recibidos:', this.data);
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }
}
