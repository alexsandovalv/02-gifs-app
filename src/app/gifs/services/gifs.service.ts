import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Gif, SearchGifsResponse } from "../interface/gifs.interface";

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey     : string = 'vlF3AZ8OaY4Nb4iP6Gd9fjINntDuRfdQ';
  private url        : string = 'https://api.giphy.com/v1/gifs';
  private _tagHistory: string[] = [];

  //TODO cambiar el tipo de resultado
  public gifList  : Gif[] = [];

  get tagHistory(){
    return [...this._tagHistory];
  }

  constructor(private http:HttpClient ) {
    this.loadLocalStorage()
    //this.gifList = JSON.parse(localStorage.getItem('resultados')!) || [];
    /*if( localStorage.getItem('historial') ){
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }*/

  }

  private organizeHistory( tag: string ){
    tag = tag.toLowerCase();
    if( this._tagHistory.includes(tag)){
      this._tagHistory = this._tagHistory.filter( (oldTag) => oldTag !== tag );
    }
    this._tagHistory.unshift( tag );
    this._tagHistory = this._tagHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(){
    localStorage.setItem('history', JSON.stringify(this._tagHistory));
  }

  private loadLocalStorage(){
    if( !localStorage.getItem('history') ){
      return;
    }
    this._tagHistory = JSON.parse(localStorage.getItem('history')! );

    if( this._tagHistory.length == 0)
      return;

    this.searchTag( this._tagHistory[0] );
  }

  searchTag( tag: string){

    tag = tag.trim().toLowerCase();
    this.organizeHistory( tag );
    /*
    if( !this._tagHistory.includes( tag )){
      this._tagHistory.unshift( tag );
      this._tagHistory = this._tagHistory.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._tagHistory));
    }
    */

    console.log(this._tagHistory)
    const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', 12)
        .set('q',  tag);
    this.http.get<SearchGifsResponse>(`${ this.url }/search`, { params })
      .subscribe( (resp) => {
        //console.log( resp.data );
        this.gifList = resp.data;
      });
  }

}
