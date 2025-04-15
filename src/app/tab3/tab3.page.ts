import { Component } from '@angular/core';
import { ArtistService } from '../core/artist.service';
import { Artist } from '../core/models';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  AllArtists: Artist[]=[];

  constructor(
    private artistSr:ArtistService,
    private router:Router,
    private alertCtrl:AlertController
  ) {
    
  }
  ionViewDidEnter(){
    this.getArtists();
  }
  getArtists(){
    this.artistSr.presentLoading();
    this.artistSr.GetAllArtist("ArtGalley").subscribe((response:any)=>{
      this.AllArtists = response;
      console.log(this.AllArtists);
      this.artistSr.dismissLoading();
    })
  }
  edit(artist:Artist){
    this.router.navigate([`/tabs/update-artist/${artist.name}`])
  }
  async deleted(artist:Artist){
    let confirmationAlert = await this.alertCtrl.create({
      header: 'Deletion confrim!',
      message: 'Are you sure to delete this Artist?',
      buttons: [
        {
          text: 'Yes',
          cssClass: 'danger',
          role: "destructive",
          handler: () => {
            this.artistSr.presentLoading();
            this.artistSr.DeleteArtist(`ArtGalley/${artist.name}`).subscribe((response:any)=>{
             console.log(response)
             if(response.delete == 'Delete Success'){
               this.artistSr.presentToast("Artist has been deleted successfully!",true);
               this.getArtists();
             }
             this.artistSr.dismissLoading();
         })
          
          }
        },
        {
          text: 'No',
          cssClass: 'primary',
          role: "cancel",
          handler: () => {
            
          
          }
        }
      ]
    });
    await confirmationAlert.present();
  }
}
