import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  constructor(private authService: AuthService, private router: Router, private loaderService: LoaderService) { }

  ngOnInit(): void {
  }

  async onReset(email) {
    this.loaderService.showLoader();
    try {
      await this.authService.forgotPassword(email.value);
      this.router.navigate(['/login']);
    } catch (error) {
      console.log("Error -> ", error);

    }
    this.loaderService.hideLoader();
  } 
}
