import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'
import { DataService } from './data.service'

import { ArtworkComponent } from './artwork/artwork.component';
import { ArtshowComponent } from './artshow/artshow.component';
import { BioComponent } from './bio/bio.component';
import { ReadmoreComponent } from './artshow/readmore/readmore.component';
import { HttpClientModule } from '@angular/common/http';
import { LPageComponent } from './l-page/l-page.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { EditartComponent } from './adminpage/editart/editart.component';
import { ViewartComponent } from './adminpage/viewart/viewart.component';
import { ViewartComponent2 } from './artwork/viewart/viewart.component';
import { ViewshowComponent } from './adminpage/viewshow/viewshow.component';
import { EditshowComponent } from './adminpage/editshow/editshow.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    ArtworkComponent,
    ArtshowComponent,
    BioComponent,
    ReadmoreComponent,
    LPageComponent,
    AdminpageComponent,
    EditartComponent,
    ViewartComponent,
    ViewartComponent2,
    ViewshowComponent,
    EditshowComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
