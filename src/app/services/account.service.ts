import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, switchMap} from 'rxjs';
import {Account} from '../models/account';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient) {}

  getAccount(): Observable<Account> {
    return this.http.get<Account>(`${environment.accountApiUrl}/balance`);
  }

  addFunds(amount: number): Observable<Account> {
    return this.http.post<Account>(`${environment.accountApiUrl}/deposit`, amount)
      .pipe(switchMap(() => this.getAccount()));
  }

  withdrawFunds(amount: number): Observable<Account> {
    return this.http.post<Account>(`${environment.accountApiUrl}/withdraw`, { amount })
      .pipe(switchMap(() => this.getAccount()));
  }


}
