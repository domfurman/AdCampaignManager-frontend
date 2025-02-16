import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CampaignService} from '../services/campaign.service';
import {Campaign} from '../models/campaign';
import {NgForOf, NgIf} from '@angular/common';
import {CampaignFormModalComponent} from '../campaign-form-modal/campaign-form-modal.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-campaign',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './campaign.component.html',
  styleUrl: './campaign.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CampaignComponent implements OnInit {
  campaignList?: Campaign[];

  constructor(private campaignService: CampaignService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadCampaigns();
    this.campaignService.getAllCampaigns();
  }

  openDialog(campaignId?: number): void {
    const dialogRef = this.dialog.open(CampaignFormModalComponent, {
      data: { campaignId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.campaignService.getAllCampaigns();
        this.loadCampaigns();
        console.log('Kampania:', result);
      }
    });
  }

  deleteCampaign(id: number): void {
    const confirmation = confirm('Are you sure you want to delete this campaign?');

    if (confirmation) {
      console.log('Deleted campaign with ID:', id);
      this.campaignService.deleteCampaign(id).subscribe(
        () => {
          this.campaignList = this.campaignList?.filter(campaign => campaign.id !== id);
        },
        (error) => {
          console.error('Error deleting campaign:', error);
        }
      );
    } else {
      console.log('Campaign deletion was canceled');
    }
  }

  loadCampaigns(): void {
    this.campaignService.getCampaignList().subscribe((campaigns) => {
      this.campaignList = campaigns;
    });
  }

}
