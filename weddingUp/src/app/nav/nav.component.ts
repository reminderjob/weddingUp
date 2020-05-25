import { Component, OnInit } from '@angular/core';
import { Content } from '../_models/content';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  contents: Content[];
  content: Content;

  constructor() {}

  ngOnInit() {}

  // loadPage() {
  //   this.contentService
  //     .loadPage()
  //     .subscribe(
  //       (contents: Content[]) => {
  //         this.content = contents[0];
  //         console.log(this.content);
  //       },
  //       (error) => {}
  //     );
  // }
}
