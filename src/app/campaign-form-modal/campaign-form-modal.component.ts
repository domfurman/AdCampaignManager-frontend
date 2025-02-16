import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {Campaign} from '../models/campaign';
import {CampaignService} from '../services/campaign.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-campaign-form-modal',
  standalone: true,
  imports: [FormsModule, NgForOf],
  templateUrl: './campaign-form-modal.component.html',
  styleUrl: './campaign-form-modal.component.scss'
})
export class CampaignFormModalComponent {
  campaign: Campaign = new Campaign();

  constructor(private dialogRef: MatDialogRef<CampaignFormModalComponent>, private campaignService: CampaignService) { }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.campaignService.addNewCampaign(this.campaign).subscribe({
      next: (response) => {
        console.log('Campaign saved:', response);
        this.dialogRef.close(response);
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }

  addKeyword() {
    this.campaign.keywords.push('');
  }

}
