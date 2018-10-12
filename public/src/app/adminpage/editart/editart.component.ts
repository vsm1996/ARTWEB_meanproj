import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-editart',
  templateUrl: './editart.component.html',
  styleUrls: ['./editart.component.css']
})
export class EditartComponent implements OnInit {

  art: any;
  updatedArt: any;
  artID: string;
  errors: any;

  constructor(
    private _data: DataService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log("HERE IS /edit/:id : ", params['id']);
      this.artID = params['id']})
      this.updatedArt = { title: '', image: '', description: '', dateCreated: '', size: '', sold: ''}
      this.getArt()
  }

  getArt(){
    console.log("ANGULAR > EditartComponent > getArt() < INVOKE")
    this._data.findArt(this.artID)
    .subscribe((response) => {
      console.log("Got our art piece!", response['payload'])
      this.updatedArt = response['payload']
    })
  }

  updateArt(){
    console.log("ANGULAR > EditartComponent > updateArt() < INVOKE")
    this._data.updateArt(this.artID, this.updatedArt)
    .subscribe((response) => {
      console.log("Updated our art!", response);
      if (!response['status']){
        this.errors = response['payload']
      }
      this.updateArt = response['payload']
    }, (err) => {
      console.log("ANGULAR > EditartComponent ERROR: > updatedArt() > error", err)
    })
  }
}
