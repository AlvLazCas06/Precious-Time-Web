import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PreferenceResponse } from '../models/interfaces/preference-response.interface';
import { EditPreferenceDto } from '../models/dto/edit-preference.dto';

@Injectable({
  providedIn: 'root',
})
export class PreferenceService {

  urlBase = 'http://localhost:8080/api/v1/preferences';

  constructor(private http: HttpClient) { }

  createPreference(): Observable<PreferenceResponse> {
    return this.http.post<PreferenceResponse>(`${this.urlBase}`, null);
  }

  getPreference(): Observable<PreferenceResponse> {
    return this.http.get<PreferenceResponse>(`${this.urlBase}`);
  }

  editPreference(editPreference: EditPreferenceDto): Observable<PreferenceResponse> {
    return this.http.put<PreferenceResponse>(`${this.urlBase}`, editPreference);
  }

}
