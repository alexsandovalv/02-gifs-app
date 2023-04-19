import {Component} from '@angular/core';
import {GifsService} from "../services/gifs.service";
import {Gif} from "../interface/gifs.interface";

@Component({
  selector: 'gifs-card-list',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent {

  constructor( private gifsService: GifsService) {
  }


  get gifs(): Gif[]{
    return this.gifsService.gifList;
  }

}
