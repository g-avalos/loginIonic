import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private loaderService: LoaderService, private authService : AuthService) { }

  ngOnInit() {
  }

  async onRegister(email, dni, password) {
    this.loaderService.showLoader();

    try {
      const user = await this.authService.register(email.value, dni.value, password.value);

      if (user) {
        this.authService.userRedirect(user);
      }
    } catch (error) {
      console.log(error);
    }

    this.loaderService.hideLoader();
  } 
}
