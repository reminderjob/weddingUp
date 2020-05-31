import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/_services/content.service';
import { Content } from 'src/app/_models/content';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  content: Content;

  constructor(contentService:ContentService) { }

  ngOnInit() {
  }

}
