import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private loaderService: LoaderService) { }

  ngOnInit() {
  }

  async onLogin(email, password) {
    this.loaderService.showLoader();

    try {
      const user = await this.authService.login(email.value, password.value);

      if (user) {
        this.authService.userRedirect(user);
      }
    } catch (error) {
      console.log(error);
    }

    this.loaderService.hideLoader();
  } 

  async onLoginGoogle() {
    this.loaderService.showLoader();

    try {
      const user = await this.authService.loginWithGoogle();
      console.log(user);
      
      if (user) {
        this.authService.userRedirect(user);
      }
    } catch (error) {
      console.log(error);
    }

    this.loaderService.hideLoader();
  } 
}
