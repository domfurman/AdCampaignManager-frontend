import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CampaignService} from '../services/campaign.service';
import {Campaign} from '../models/campaign';
import {NgForOf, NgIf} from '@angular/common';
import {CampaignFormModalComponent} from '../campaign-form-modal/campaign-form-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {Account} from '../models/account';
import {AccountService} from '../services/account.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-campaign',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './campaign.component.html',
  styleUrl: './campaign.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CampaignComponent implements OnInit {
  campaignList?: Campaign[];
  account?: Account;
  depositAmount: number = 0;

  constructor(private campaignService: CampaignService, private dialog: MatDialog, private accountService: AccountService) { }

  ngOnInit(): void {
    this.loadCampaigns();
    this.campaignService.getAllCampaigns();
    this.loadAccount();
  }

  openDialog(campaignId?: number): void {
    const dialogRef = this.dialog.open(CampaignFormModalComponent, {
      data: { campaignId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.campaignService.getAllCampaigns();
        this.loadCampaigns();
        this.loadAccount();
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

  loadAccount(): void {
    this.accountService.getAccount().subscribe(
      data => this.account = data
    )
  }

  depositMoney() {
    if (this.depositAmount > 0) {
      this.accountService.addFunds(this.depositAmount).subscribe({
        next: (updatedAccount) => {
          console.log('Updated Wallet:', updatedAccount);
          this.depositAmount = 0;
          this.loadAccount();
        },
        error: (err) => console.error('Error:', err)
      });
    } else {
      console.warn('Enter a valid amount');
    }
  }

}
