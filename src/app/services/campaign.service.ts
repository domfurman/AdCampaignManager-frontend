import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Campaign} from '../models/campaign';
import {CreateCampaign} from '../models/create-campaign';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  basicTestUrl: string = 'http://localhost:8080';
  private campaignListSubject: BehaviorSubject<Campaign[]> = new BehaviorSubject<Campaign[]>([]);

  constructor(private http: HttpClient) { }

  getAllCampaigns(): void {
    this.http.get<Campaign[]>(`${this.basicTestUrl}/api/get-all-campaigns`).subscribe({
      next: (campaigns) => {
        this.campaignListSubject.next(campaigns);
      },
      error: (err) => {
        console.error('Error loading campaigns:', err);
      }
    });
  }

  getCampaignList(): Observable<Campaign[]> {
    return this.campaignListSubject.asObservable();
  }

  addNewCampaign(campaign: CreateCampaign): Observable<CreateCampaign> {
    return this.http.post<CreateCampaign>(`${this.basicTestUrl}/api/create-campaign`, campaign);
  }

  deleteCampaign(id: number): Observable<Campaign> {
    return this.http.delete<Campaign>(`${this.basicTestUrl}/api/delete-campaign/${id}`);
  }

  updateCampaign(id: number | undefined, updatedCampaign: CreateCampaign): Observable<Campaign> {
    return this.http.put<Campaign>(`${this.basicTestUrl}/api/update-campaign/${id}`, updatedCampaign);
  }

  getCampaignById(id: number): Observable<Campaign> {
    return this.http.get<Campaign>(`${this.basicTestUrl}/api/find-by-id/${id}`);
  }

}
