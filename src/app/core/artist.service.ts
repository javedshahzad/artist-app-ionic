import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  baseUrl=environment.baseUrl
  isLoading: boolean=false;
  constructor(private http:HttpClient,
    private toastController:ToastController,
    private loadingController:LoadingController

  ) { }
GetAllArtist(url: any){
  return this.http.get(this.baseUrl+url);
}
PostNewArtist(url: any,data:any){
  return this.http.post(this.baseUrl+url,data);
}
UpdateArtist(url: any,data:any){
  return this.http.put(this.baseUrl+url,data);
}
DeleteArtist(url: any){
  return this.http.delete(this.baseUrl+url);
}
async presentToast(msgText:any, isSuccess: boolean = false) {
  let duration = isSuccess ? 3000 : 4000;
  const toast = await this.toastController.create({
    message: msgText,
    duration: duration,
    position: 'bottom',
    color:isSuccess === true ? "success" : "dark",
    buttons: [
      {
        side: 'end', // Adjust the side as per your preference (start, end)
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Handle the close button click event here
          console.log('Toast closed');
        }
      }
    ]
  });
  toast.present();
}
async presentLoading() {
  this.isLoading = true;

  return await this.loadingController.create({
    mode:"ios",
    spinner:"bubbles"
  }).then(loadingElement => {
    loadingElement.present().then(() => {
      if (!this.isLoading) {
        loadingElement.dismiss();
      }
    });
  });
}

async dismissLoading() {
  this.isLoading = false;
  return await this.loadingController.dismiss();
}
}
