import { Component } from '@angular/core';
import { ArtistService } from '../core/artist.service';
import { Artist } from '../core/models';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  AllFeaturedArtists: Artist[]=[];

  constructor(
    private artistSr:ArtistService
  ) {
    this.getArtists();
  }

  getArtists(){
    this.artistSr.presentLoading();
    this.artistSr.GetAllArtist("ArtGalley").subscribe((response:any)=>{
      this.AllFeaturedArtists = response;
      console.log(this.AllFeaturedArtists)
      this.AllFeaturedArtists = this.AllFeaturedArtists.filter(data=> data.is_featured_artist === 1);
      this.artistSr.dismissLoading();

    })
  }

}
