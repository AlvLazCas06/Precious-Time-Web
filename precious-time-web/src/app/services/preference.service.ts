import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PreferenceResponse } from '../models/interfaces/preference-response.interface';

@Injectable({
  providedIn: 'root',
})
export class PreferenceService {

  urlBase = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  createPreference():Observable<PreferenceResponse> {
    return this.http.post<PreferenceResponse>(`${this.urlBase}/preference`, null);
  }

}
