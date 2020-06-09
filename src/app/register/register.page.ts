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

  async onRegister(email, password) {
    this.loaderService.showLoader();

    try {
      const user = await this.authService.register(email.value, password.value);
    } catch (error) {
      console.log(error);
    }

    this.loaderService.hideLoader();
  } 
}