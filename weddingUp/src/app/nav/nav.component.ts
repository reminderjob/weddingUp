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
  activeTab = 'Welcome';

  constructor() {}

  ngOnInit() {}

  select(activeTab){
    this.activeTab = activeTab;
    const el = document.getElementById(activeTab);
    el.scrollIntoView({ behavior: "smooth" });
  }

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
