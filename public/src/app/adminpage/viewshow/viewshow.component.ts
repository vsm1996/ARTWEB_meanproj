import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-viewshow',
  templateUrl: './viewshow.component.html',
  styleUrls: ['./viewshow.component.css']
})
export class ViewshowComponent implements OnInit {
  show: any;
  showID: any;
  constructor(
    private _data: DataService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log("HERE IS /view/:id : ", params['id']);
      this.showID = params['id']})
      this.findShow();
  }
  findShow(){
    console.log("find show invoked");
    this._data.findShow(this.showID)
    .subscribe((response) => {
      console.log("ANGULAR > ViewartComponent > findShow() > response: ", response);
      this.show = response['payload'];
    }, (err) => {
      console.log("ANGULAR > ViewartComponent > findShow() > ERROR: ", err)
    })
  }
}
