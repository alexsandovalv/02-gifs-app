import { Component } from '@angular/core';
import {GifsService} from "../../gifs/services/gifs.service";

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private gifService: GifsService) {
  }

  get tags(){
    return this.gifService.tagHistory;
  }

  searchT(item:string ){
    //console.log(item)
    this.gifService.searchTag(item);
  }

}
