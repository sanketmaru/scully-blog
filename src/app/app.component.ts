import { Component } from '@angular/core';
import { IdleMonitorService, ScullyRoutesService } from '@scullyio/ng-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public idle: IdleMonitorService,
    public scully: ScullyRoutesService
  ) {
    console.log('scully', scully);
  }
  title = 'scully-blog';
}
