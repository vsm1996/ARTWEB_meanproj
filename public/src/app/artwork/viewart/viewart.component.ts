import { 
  Component, 
  OnInit, 
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef 
} from '@angular/core';
import {NgForm} from '@angular/forms';
import { DataService } from '../../data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-viewart',
  templateUrl: './viewart.component.html',
  styleUrls: ['./viewart.component.css']
})
export class ViewartComponent2 implements OnInit {
  @ViewChild('cardInfo') cardInfo: ElementRef;

  card: any;
  error: String;
  art: any;
  artID: any;
  constructor(
    private _data: DataService,
    private cd: ChangeDetectorRef,
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

  openCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_live_45xUwb7UMKxH8QBIuj9jXrxH',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
      }
    });

    handler.open({
      name: 'LotusArts',
      description: 'Art Purchase',
      amount: 3500
    });
  }
}
