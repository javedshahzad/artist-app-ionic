import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ArtistService } from 'src/app/core/artist.service';
import { Artist } from 'src/app/core/models';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.scss'],
})
export class AddArtistComponent  implements OnInit {
  public ArtistForm:any=FormGroup;
  SingleArtist: Artist;
  constructor(
    private formbuilder: FormBuilder,
    private router:Router,
    private artistSr:ArtistService
  ) { 
   
  }
  ngOnInit(): void {
    this.ArtistForm = this.formbuilder.group({
      artist_ID: ['', Validators.required],
      name: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      artwork_type: ["", Validators.required],
      contact_info: ["", Validators.required],
      exibition_date: ["", Validators.required],
      is_featured_artist: ["", Validators.required],
      special_note: ["", []],
  });

  }

  AddArtist(){
    console.log(this.ArtistForm.value)
    if (this.ArtistForm.invalid) {
      Object.keys(this.ArtistForm.controls).forEach(key => {
        if (this.ArtistForm.controls[key].invalid) {
          this.ArtistForm.controls[key].markAsTouched({ onlySelf: true });
        }
      });
      this.artistSr.presentToast("Please enter all details",false);
      return;
    }

      const artist:Artist = {
        artist_id: this.ArtistForm.value.artist_ID,
        name:this.ArtistForm.value.name,
        dob:this.ArtistForm.value.dob,
        gender:this.ArtistForm.value.gender,
        artwork_type:this.ArtistForm.value.artwork_type,
        contact_info:this.ArtistForm.value.contact_info,
        exhibition_date:this.ArtistForm.value.exibition_date,
        special_notes:this.ArtistForm.value.special_note,
        is_featured_artist:parseInt(this.ArtistForm.value.is_featured_artist)
      }
     
        this.artistSr.presentLoading();
          this.artistSr.PostNewArtist("ArtGalley/",artist).subscribe((response:any)=>{
            console.log(response);
            if(response.insert == 'success'){
              this.artistSr.presentToast("Artist has been added successfully!",true);
              this.ArtistForm.reset();
              this.router.navigate(["/tabs/tab3"]);
            }
            this.artistSr.dismissLoading();
          });
    
    }

}
