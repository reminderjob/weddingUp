import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Content } from '../_models/content';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  content: Content;
  latest_date: string;

  constructor(private route: ActivatedRoute, public datepipe: DatePipe) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.content = data['contents'][0];
    });
    this.latest_date = this.datepipe.transform(
      this.content.the_date,
      'yyyy,MM,dd hh:mm'
    );
  }
}
