import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-viewart',
  templateUrl: './viewart.component.html',
  styleUrls: ['./viewart.component.css']
})
export class ViewartComponent implements OnInit {
  art: any;
  artID: any;
  constructor(
    private _data: DataService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log("HERE IS /view/:id : ", params['id']);
      this.artID = params['id']})
      this.findArt();
  }
  findArt(){
    console.log("find art invoked");
    this._data.findArt(this.artID)
    .subscribe((response) => {
      console.log("ANGULAR > ViewartComponent > findArt() > response: ", response);
      this.art = response['payload'];
    }, (err) => {
      console.log("ANGULAR > ViewartComponent > findArt() > ERROR: ", err)
    })
  }
}
