import {Component} from '@angular/core';
import {DashboardService} from './dashboard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DashboardService]
})
export class AppComponent {
  title = 'app';
}
