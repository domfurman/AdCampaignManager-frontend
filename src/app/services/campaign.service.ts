import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Campaign} from '../models/campaign';
import {CreateCampaign} from '../models/create-campaign';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  private campaignListSubject: BehaviorSubject<Campaign[]> = new BehaviorSubject<Campaign[]>([]);

  constructor(private http: HttpClient) { }

  getAllCampaigns(): void {
    this.http.get<Campaign[]>(`${environment.campaignApiUrl}/api/get-all-campaigns`).subscribe({
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
    return this.http.post<CreateCampaign>(`${environment.campaignApiUrl}/api/create-campaign`, campaign);
  }

  deleteCampaign(id: number): Observable<Campaign> {
    return this.http.delete<Campaign>(`${environment.campaignApiUrl}/api/delete-campaign/${id}`);
  }

  updateCampaign(id: number | undefined, updatedCampaign: CreateCampaign): Observable<Campaign> {
    return this.http.put<Campaign>(`${environment.campaignApiUrl}/api/update-campaign/${id}`, updatedCampaign);
  }

  getCampaignById(id: number): Observable<Campaign> {
    return this.http.get<Campaign>(`${environment.campaignApiUrl}/api/find-by-id/${id}`);
  }

  getCities(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.campaignApiUrl}/api/get-cities`);
  }

  getSuggestedKeywords(query: string): Observable<string[]> {
    return this.http.get<string[]>(`${environment.campaignApiUrl}/api/keywords?query=${query}`);
  }

}
