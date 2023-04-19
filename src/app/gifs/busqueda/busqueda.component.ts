import {Component, ElementRef, ViewChild} from '@angular/core';
import {GifsService} from "../services/gifs.service";

@Component({
  selector: 'gifs-search-box',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtTagInput') tagInput!:ElementRef<HTMLInputElement>;

  constructor( private gifService: GifsService) {
  }
  searchTag(  ){

    const newTag = this.tagInput.nativeElement.value;
    if( newTag.trim().length == 0) return;

    this.gifService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
  }
}
