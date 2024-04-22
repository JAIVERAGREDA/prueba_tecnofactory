import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: any;
  constructor(private authService: AuthService, ) {}
  
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }
  cerrarSesion(){
    localStorage.clear();
    this.currentUser = this.authService.getCurrentUser();
  }
}
