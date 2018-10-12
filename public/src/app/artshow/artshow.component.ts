import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-artshow',
  templateUrl: './artshow.component.html',
  styleUrls: ['./artshow.component.css']
})
export class ArtshowComponent implements OnInit {
  shows: any;
  errors: any;

  constructor(private _data: DataService) { }

  ngOnInit() {
    this.shows = [];
    this.errors = [];
    this.findShows();
  }

  findShows(){
    console.log("ANGULAR > ArtSHOWcomponent > findShows() < INVOKED");
    this._data.findAllShows()
    .subscribe((response) => {
      console.log("Here are all the shows! ", response);
      if (!response['status']){
        this.errors = response['payload'];
      }
      this.shows = response['payload'];
    }, (err) => {
      console.log("ANGULAR ERROR: cannot get shows. Err: ", err);
    })
  }

}
