import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CampaignComponent} from './campaign/campaign.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CampaignComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'adcampaignmanager-frontend';
}
