import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormsModule} from '@angular/forms';
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
export class CampaignFormModalComponent implements OnInit {
  campaign: CreateCampaign = new CreateCampaign();
  newKeyword: string = '';
  keywordsTemporary: string[] = [];
  isEditing: boolean = false;
  cities: string[] = [];
  keywordSuggestions: string[] = [];
  newKeywordSuggestion: string = '';

  constructor(
    private dialogRef: MatDialogRef<CampaignFormModalComponent>,
    private campaignService: CampaignService,
    @Inject(MAT_DIALOG_DATA) public data: { campaignId?: number }) {
    if (data.campaignId) {
      this.isEditing = true;
      this.loadCampaign(data.campaignId);
    }
  }

  ngOnInit() {
    this.campaignService.getCities().subscribe(
      (data) => this.cities = data,
    )
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

  addKeyword(word: string): void {
    if (word.trim()) {
      this.keywordsTemporary.push(word.trim());
      this.newKeyword = '';
    }
  }

  removeKeyword(index: number): void {
    this.keywordsTemporary.splice(index, 1);
  }

  fetchKeywordSuggestions() {
    if (this.newKeywordSuggestion.length > 1) {
      console.log(`Fetching keywords for: ${this.newKeywordSuggestion}`);
      this.campaignService.getSuggestedKeywords(this.newKeywordSuggestion)
        .subscribe(suggestions => {
          console.log('Received suggestions:', suggestions);
          this.keywordSuggestions = suggestions
        });
    }
  }

  selectKeyword(suggestion: string) {
    this.newKeywordSuggestion = suggestion;
    this.addKeyword(suggestion);
    this.keywordSuggestions = [];
  }

  toggleCampaignStatus(): void {
    this.campaign.isCampaignActive = !this.campaign.isCampaignActive;
    console.log('Campaign status changed to:', this.campaign.isCampaignActive);
  }

}
