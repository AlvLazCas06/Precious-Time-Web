import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReminderListResponse, ReminderResponse } from '../models/interfaces/reminder-list-response.interface';
import { CreateReminderDto } from '../models/dto/create-reminder.dto';

@Injectable({
  providedIn: 'root',
})
export class ReminderService {

  urlBase = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  createNotification(newReminder: CreateReminderDto): Observable<ReminderResponse> {
    return this.http.post<ReminderResponse>(`${this.urlBase}/reminder`, newReminder);
  }

  getNotifiactions(): Observable<ReminderListResponse> {
    return this.http.get<ReminderListResponse>(`${this.urlBase}/reminder`);
  }

}
