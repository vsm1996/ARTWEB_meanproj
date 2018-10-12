import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtworkComponent } from './artwork/artwork.component';
import { ArtshowComponent } from './artshow/artshow.component';
import { BioComponent } from './bio/bio.component';
import { ReadmoreComponent } from './artshow/readmore/readmore.component';
import { LPageComponent } from './l-page/l-page.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { EditartComponent } from './adminpage/editart/editart.component';
import { ViewartComponent } from './adminpage/viewart/viewart.component';
import { ViewartComponent2 } from './artwork/viewart/viewart.component';
import { EditshowComponent } from './adminpage/editshow/editshow.component';
import { ViewshowComponent } from './adminpage/viewshow/viewshow.component';

const routes: Routes = [
  {path: 'artwork', component: ArtworkComponent, children: [
    {path: 'view/:id', component: ViewartComponent2}
  ] },
  {path: 'artshow', component: ArtshowComponent},
  {path: 'bio', component: BioComponent},
  {path: 'readmore', component: ReadmoreComponent},
  {path: 'lotuslogin', component: LPageComponent},
  {path: 'admin', component: AdminpageComponent, children: [
    { path: 'art/edit/:id', component: EditartComponent },
    { path: 'art/view/:id', component: ViewartComponent},
    { path: 'show/edit/:id', component: EditshowComponent},
    { path: 'show/view/:id', component:ViewshowComponent }
  ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
