import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {Campaign} from '../models/campaign';
import {CampaignService} from '../services/campaign.service';
import {NgForOf, NgIf} from '@angular/common';
import {CreateCampaign} from '../models/create-campaign';

@Component({
  selector: 'app-campaign-form-modal',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf],
  templateUrl: './campaign-form-modal.component.html',
  styleUrl: './campaign-form-modal.component.scss'
})
export class CampaignFormModalComponent {
  campaign: CreateCampaign = new CreateCampaign();
  newKeyword: string = '';
  keywordsTemporary: string[] = [];
  isEditing: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CampaignFormModalComponent>,
    private campaignService: CampaignService,
    @Inject(MAT_DIALOG_DATA) public data: { campaignId?: number }) {
    if (data.campaignId) {
      this.isEditing = true;
      this.loadCampaign(data.campaignId);
    }
  }

  loadCampaign(campaignId: number): void {

    this.campaignService.getCampaignById(campaignId).subscribe((campaign) => {
      this.campaign = campaign;
      this.keywordsTemporary = campaign.keywords;
    });
  }

  close(): void {
    this.dialogRef.close();
  }
  save(): void {
    this.campaign.keywords = [...this.keywordsTemporary];

    if (this.isEditing) {
      this.campaignService.updateCampaign(this.data.campaignId, this.campaign).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
        },
        error: (err) => console.error('Error:', err)
      });
    } else {
      this.campaignService.addNewCampaign(this.campaign).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
        },
        error: (err) => console.error('Error:', err)
      });
    }
  }

  addKeyword(): void {
    if (this.newKeyword.trim()) {
      this.keywordsTemporary.push(this.newKeyword.trim());
      this.newKeyword = '';
    }
  }

  removeKeyword(index: number): void {
    this.keywordsTemporary.splice(index, 1);
  }

}
