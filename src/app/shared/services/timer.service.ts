import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { TimerModel } from '../../models/timer.model';
import { handleError } from '../util';
import { ReturnModel } from '../../models/return.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  constructor(private httpClient: HttpClient) {}

  url = environment.apiUrl + '/timers/';

  getByDate(date: string): Observable<TimerModel[]> {
    return this.httpClient
      .get<TimerModel[]>(`${this.url}date/${date}`)
      .pipe(retry(2), catchError(handleError));
  }

  createTimer(timer: TimerModel): Observable<ReturnModel> {
    return this.httpClient
      .post<ReturnModel>(this.url, timer)
      .pipe(retry(2), catchError(handleError));
  }

  deleteTimer(id: string): Observable<ReturnModel> {
    return this.httpClient
      .delete<ReturnModel>(this.url + id)
      .pipe(retry(2), catchError(handleError));
  }
}
