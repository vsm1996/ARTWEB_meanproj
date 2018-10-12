import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-l-page',
  templateUrl: './l-page.component.html',
  styleUrls: ['./l-page.component.css']
})
export class LPageComponent implements OnInit {
  regadmin: any;
  logadmin: any;
  errors: any
  
  constructor(
    private _login: LoginService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.regadmin = { first_name: "", last_name: "", email: "", password: "" }
    this.logadmin = {email: "", password: ""}
    this.errors = [];
  }

  reg(){
    console.log("Register")
    console.log(this.regadmin);
    this._login.register(this.regadmin)
    .subscribe ((response) => {
      console.log("HERE IS THE RESULT OF OUR /REGISTER ", response)
      if(response['status']){
      this._router.navigate(['/admin']);
      }
    }, (err) => {
      console.log(err)
    })
    this.regadmin = { first_name: "", last_name: "", email: "", password: "" }
  }

  login(){
    console.log("Log In");
    console.log(this.logadmin);
    this._login.login(this.logadmin)
    .subscribe((response) => {
      console.log("Here is our login response", response)
      if(response['status']){
        this._router.navigate(['/admin']);
        }
    }, (err) => console.log("ERROR LOGIN.ts", err))
  }
}
