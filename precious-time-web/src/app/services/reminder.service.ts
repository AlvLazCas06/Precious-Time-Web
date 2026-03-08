import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReminderListResponse, ReminderResponse } from '../models/interfaces/reminder-list-response.interface';
import { CreateReminderDto } from '../models/dto/create-reminder.dto';

@Injectable({
  providedIn: 'root',
})
export class ReminderService {

  urlBase = 'http://localhost:8080/api/v1/reminders';

  constructor(private http: HttpClient) {}

  createNotification(newReminder: CreateReminderDto): Observable<ReminderResponse> {
    return this.http.post<ReminderResponse>(`${this.urlBase}/admin`, newReminder);
  }

  getNotifiactions(): Observable<ReminderListResponse> {
    return this.http.get<ReminderListResponse>(`${this.urlBase}`);
  }

}
