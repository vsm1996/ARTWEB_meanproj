import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-artwork',
  templateUrl: './artwork.component.html',
  styleUrls: ['./artwork.component.css']
})
export class ArtworkComponent implements OnInit {
  arts: any
  errors: any

  constructor(private _data: DataService) { }

  ngOnInit() {
    this.arts = [];
    this.errors = [];
    this.findArts()
  }
  findArts(){
    console.log("ANGULAR > ArtworkComponent > findArts() < INVOKED")
    this._data.findAllArt()
    .subscribe((response) => {
      console.log("Here are the arts!", response)
      if (!response['status']){
        this.errors = response['payload']
      }
      this.arts = response['payload']
    }, (err) => {
      console.log("ANGULAR ERROR: cannot get arts. ERROR: ", err)
    })
  }
}
