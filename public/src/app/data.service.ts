import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient) { }
  findAllArt(){
    console.log("ANGULAR > DataService > findAllArt < INVOKED");
    return this._http.get('/arts')
  }

  findArt(id){
    console.log("ANGULAR > DataService > findArt < INVOKED");
    return this._http.get(`/arts/${id}`)
  }

  addArt(data) {
    console.log("ANGULAR > DataService > addArt > data:", data);
    console.log("ANGULAR > DataService > addArt > data (after modified):", data);
    return this._http.post('/arts', data);
  }

  deleteArt(id){
    console.log("ANGULAR > DataService > deleteArt > Art ID: ", id)
    return this._http.delete(`/arts/${id}`)
  }
  
  updateArt(id, obj){
    console.log("ANGULAR > DataService > updateArt > Art: ", id, obj)
    return this._http.put(`/arts/${id}/edit`, obj)
  }

  findAllShows(){
    console.log("ANGULAR > DataService > findAllShows < INVOKED");
    return this._http.get('/shows')
  }

  findShow(id){
    console.log("ANGULAR > DataService > findShow < INVOKED");
    return this._http.get(`/shows/${id}`)
  }

  addShow(data){
    console.log("ANGULAR > DataService > addShow > data:", data);
    return this._http.post('/shows', data);
  }

  deleteShow(id){
    console.log("ANGULAR > DataService > deleteShow > Show ID: ", id);
    return this._http.delete(`/shows/${id}`)
  }

  updateShow(id, obj){
    console.log("ANGULAR > DataService > updateShow > Show:", id, obj);
    return this._http.put(`/shows/${id}/edit`, obj)
  }

}
