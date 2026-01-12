import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Preference, PreferenceResponse } from '../models/interfaces/preference-response.interface';
import { EditPreferenceDto } from '../models/dto/edit-preference.dto';

@Injectable({
  providedIn: 'root',
})
export class PreferenceService {

  urlBase = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  createPreference(): Observable<PreferenceResponse> {
    return this.http.post<PreferenceResponse>(`${this.urlBase}/preference`, null);
  }

  getPreference(): Observable<PreferenceResponse> {
    return this.http.get<PreferenceResponse>(`${this.urlBase}/preference`);
  }

  editPreference(id: number, editPreference: EditPreferenceDto): Observable<Preference> {
    return this.http.put<Preference>(`${this.urlBase}/preference/${id}`, editPreference);
  }

}
