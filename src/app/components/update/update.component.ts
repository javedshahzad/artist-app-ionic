import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ArtistService } from 'src/app/core/artist.service';
import { Artist } from 'src/app/core/models';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent  implements OnInit {
  name: any='';
  SingleArtist: Artist;
  public ArtistForm:any=FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private artistSr:ArtistService
  ) { 
    this.route.params.subscribe(params => {
      this.name = params['name'] ? params['name'] : "";
      console.log(this.name)
      if(this.name){
        this.getSingleArtist(this.name);
      }
    })
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
  getSingleArtist(name){
    this.artistSr.presentLoading();
    this.artistSr.GetAllArtist(`ArtGalley/${name}`).subscribe((response:any)=>{
      this.SingleArtist = response[0];
      console.log(response)
    this.ArtistForm.get('artist_ID').setValue(this.SingleArtist.artist_id);
    this.ArtistForm.get('name').setValue(this.SingleArtist['name']);
    this.ArtistForm.get('dob').setValue(this.formatDate(this.SingleArtist['dob']));
    this.ArtistForm.get('gender').setValue(this.SingleArtist['gender']);
    this.ArtistForm.get('artwork_type').setValue(this.SingleArtist['artwork_type']);
    this.ArtistForm.get('contact_info').setValue(this.SingleArtist['contact_info']);
    this.ArtistForm.get('exibition_date').setValue(this.formatDate(this.SingleArtist['exhibition_date']));
    this.ArtistForm.get('special_note').setValue(this.SingleArtist['special_notes']);
    this.ArtistForm.get('is_featured_artist').setValue(String(this.SingleArtist['is_featured_artist']));
    this.artistSr.dismissLoading()
    })
  }
  formatDate(date){
      // Format: YYYY-MM-DD
  const day = new Date(date).toLocaleString("en-US", { day: "2-digit" });
  const month = new Date(date).toLocaleString("en-US", { month: "2-digit" });
  const year = new Date(date).getFullYear();

  // Assign to input variable
  return `${year}-${month}-${day}`;
  }
  update(){
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
        artist_id:this.ArtistForm.value.artist_ID,
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
        this.artistSr.UpdateArtist(`ArtGalley/${this.SingleArtist.name}`,artist).subscribe((response:any)=>{
          console.log(response);
          if(response.update == 'success'){
            this.artistSr.presentToast("Artist has been updated successfully!",true);
            this.ArtistForm.reset();
            this.router.navigate(["/tabs/tab3"]);
          }
          this.artistSr.dismissLoading();
        });
    }


}
