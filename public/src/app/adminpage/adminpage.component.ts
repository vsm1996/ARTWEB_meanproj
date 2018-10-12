import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { DataService } from '../data.service'
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {
  current: any;
  art: any;
  arts: any;
  errors: any;
  show: any;
  shows: any;
  fileToUpload: File = null;

  constructor(
    private _login: LoginService,
    private _data: DataService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.current= [];
    this.art = { title: '', description: '', image: '', size: '', dateCreated: ''}
    this.arts = [];
    this.errors = [];
    this.show = { title: '', creator: '', location: '', date: '', image: '', link: ''}
    this.shows=[];
    this.adminInfo();
    this.findArts();
    this.findShows();
  }

  adminInfo(){
    this._login.admin()
    .subscribe((result) => {
      console.log("Result of admin", result)
      this.current = result['payload']
      console.log("CURRENT", this.current)
    }, (err) => {
      console.log("error in admin", err)
    })
  }

  handleFileInput(files: FileList) {
    console.log("ANGULAR > AdminpageComponent > handleFileInput(files) > files: ", files)
    this.fileToUpload = files.item(0);
    console.log("ANGULAR > AdminpageComponent > handleFileInput(files) > this.fileToUpload: ", this.fileToUpload)
  }

  addArt(){
    console.log("ANGULAR > AdminpageComponent > addArt > this.art", this.art)
    console.log("ANGULAR > AdminpageComponent > addArt > this.fileToUpload", this.fileToUpload)
    this._data.addArt(this.art).subscribe(
      response => {
        console.log("ANGULAR > AdminpageComponent > addArt > _data.postFile.subscribe - success: ", response)
        this.findArts()
      }, error => {
        console.log("ANGULAR > AdminpageComponent > addArt > _data.postFile.subscribe - failed: ", error)
      });
    // this.art = { title: '', description: '', size: '', dateCreated: ''}
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

  deleteArt(id){
    console.log("ANGULAR > ArtworkComponent > deleteArt() < INVOKED");
    this._data.deleteArt(id)
    .subscribe((response) => {
      console.log("Art deleted, ", response)
      this.findArts()
    }, (err) => {
      console.log("ANGULAR ERROR: error deleting art. ERROR: ", err)
    })
  }

  addShow(){
    console.log("show added")
    this._data.addShow(this.show).subscribe(
      response => {
        console.log("ANGULAR > AdminpageComponent > addShow > success: ", response)
        this.findShows()
      }, error => {
        console.log("ANGULAR > AdminpageComponent > addShow > failed: ", error);
      }
    )
  }

  findShows(){
    console.log("ANGULAR > AdminComponent > findShows() < INKVOKED");
    this._data.findAllShows()
    .subscribe((response) => {
      console.log("Here are the shows!", response)
      if(!response['status']){
        this.errors = response['payload']
      }
      this.shows=response['payload']

    }, (err) =>{
      console.log("ANGULAR ERROR: cannot get shows. ERROR: ", err)
    })
  }

  deleteShow(id){
    console.log("ANGULAR > ArtworkComponent > deleteShow() < INVOKED");
    this._data.deleteShow(id)
    .subscribe((response) => {
      console.log("Show deleted, ", response)
      this.findShows()
    }, (err) => {
      console.log("ANGULAR ERROR: error deleting show. ERROR: ", err)
    }
  )
  }

  logout(){
    console.log("logout button")
    this._login.logout()
    .subscribe((response) => {
      console.log(response)
      this._router.navigate(['/lotuslogin']);
    })
  }
}
