import { AfterViewChecked, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HighlightService } from '../highlight.service';

declare var ng: any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated

})
export class BlogComponent implements OnInit, AfterViewChecked {
  ngOnInit() {}

  constructor(private highlightService: HighlightService) {
  }

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }
}
