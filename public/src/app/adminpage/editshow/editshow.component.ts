import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-editshow',
  templateUrl: './editshow.component.html',
  styleUrls: ['./editshow.component.css']
})
export class EditshowComponent implements OnInit {
  updatedShow:any;
  showID:any;
  errors:any;

  constructor( private _data: DataService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log("HERE IS /edit/:id : ", params['id']);
      this.showID = params['id']})
      this.updatedShow = { title: '', image: '', description: '', dateCreated: '', size: '', sold: ''}
      this.getShow()
  }
  getShow(){
    console.log("ANGULAR > EditshowComponent > getShow() < INVOKE")
    this._data.findShow(this.showID)
    .subscribe((response) => {
      console.log("Got our art piece!", response['payload'])
      this.updatedShow = response['payload']
    })
  }

  updateShow(){
    console.log("ANGULAR > EditshowComponent > updateShow() < INVOKE")
    this._data.updateArt(this.showID, this.updatedShow)
    .subscribe((response) => {
      console.log("Updated our art!", response);
      if (!response['status']){
        this.errors = response['payload']
      }
      this.updateShow = response['payload']
    }, (err) => {
      console.log("ANGULAR > EditshowComponent ERROR: > updateShow() > error", err)
    })
  }

}
