import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CampaignService} from '../services/campaign.service';
import {Campaign} from '../models/campaign';
import {NgForOf} from '@angular/common';
import {CampaignFormModalComponent} from '../campaign-form-modal/campaign-form-modal.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-campaign',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './campaign.component.html',
  styleUrl: './campaign.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CampaignComponent implements OnInit {
  campaignList?: Campaign[];

  constructor(private campaignService: CampaignService, private dialog: MatDialog) { }

  ngOnInit(): void {
    console.log('works')
    this.campaignService.getAllCampaigns()
      .subscribe((data) => {
      this.campaignList = data;
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CampaignFormModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Nowa kampania:', result);
      }
    });
  }

}
