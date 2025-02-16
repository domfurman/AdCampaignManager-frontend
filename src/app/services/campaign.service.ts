import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Campaign} from '../models/campaign';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  basicTestUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAllCampaigns(): Observable<Campaign[]> {
    console.log('service works')
    return this.http.get<Campaign[]>(`${this.basicTestUrl}/api/get-all-campaigns`);
  }


}
