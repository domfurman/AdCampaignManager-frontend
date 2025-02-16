import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-campaign-form-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './campaign-form-modal.component.html',
  styleUrl: './campaign-form-modal.component.scss'
})
export class CampaignFormModalComponent {
  campaignName: string = '';

  constructor(private dialogRef: MatDialogRef<CampaignFormModalComponent>) {}

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    console.log('Zapisano kampanię:', this.campaignName);
    this.dialogRef.close(this.campaignName);
  }

}
