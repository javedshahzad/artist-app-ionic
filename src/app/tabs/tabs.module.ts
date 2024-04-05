import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { AddArtistComponent } from '../components/add-artist/add-artist.component';
import { PrivacyComponent } from '../components/privacy/privacy.component';
import { UpdateComponent } from '../components/update/update.component';
import { SearchComponent } from '../components/search/search.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TabsPage,AddArtistComponent,PrivacyComponent,UpdateComponent,SearchComponent]
})
export class TabsPageModule {}
