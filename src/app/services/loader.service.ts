import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class LoaderService {
  constructor(public loadingController: LoadingController) {}

  // Show the loader for infinite time
  showLoader(): void {
    this.loadingController
      .create({
        spinner: "lines",
        message: "Por favor espere...",
      })
      .then((res) => {
        res.present();
      });
  }

  // Hide the loader if already created otherwise return error
  hideLoader(): void {
    this.loadingController
      .dismiss()
      .then((res) => {
        console.log("Loading dismissed!", res);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
}
