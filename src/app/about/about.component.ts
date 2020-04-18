import { Component, OnInit } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  links$: Observable<any> = this.scully.available$;
  constructor(private scully: ScullyRoutesService) { }

  ngOnInit(): void {
    // debug current pages
    this.links$.subscribe(links => {
      console.log('links', links);
    });
  }

}
