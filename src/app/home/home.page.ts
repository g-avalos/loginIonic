import { AuthService } from './../services/auth.service';
import { User } from 'firebase/app';
import { Usuario } from 'src/app/shared/model/usuario.interface';
import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public _notasDni: any;
  public _notas: any;
  sub: Subscription;
  user: Usuario;
  public usuario$: Observable<User> = this.authService.afAuth.user;

  constructor(private authService: AuthService) { }

  async ngOnInit(): Promise<void> {
    let usuario = this.authService.usuario$.subscribe(
      user => {
        this.user = user;
        if (this.user !== undefined && this.user !== null) {
          if (this.user.dni === 24756181) {
            axios.get('http://localhost:3001/notas').then(response => {
              this._notas = response.data.notas;
            });
          } else {
            axios.get('http://localhost:3001/notas/' + this.user.dni).then(response => {
              this._notasDni = response.data.notasDni;
            });
          }
        }
      });
  }
}
