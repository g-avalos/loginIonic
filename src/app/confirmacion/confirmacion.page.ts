import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.page.html',
  styleUrls: ['./confirmacion.page.scss'],
})
export class ConfirmacionPage {
  user$ : Observable<User> = this.authService.afAuth.user;

  constructor(private authService: AuthService) { }

  reenviar() {
    this.authService.enviarMailVerificacion();
  }

  ngOnDestroy() {
    this.authService.logout();
  } 
}
