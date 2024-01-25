import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { TaskModel } from '../../models/task.model';
import { ReturnModel } from '../../models/return.model';
import { handleError } from '../../shared/util';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  url = environment.apiUrl + '/tasks/';

  constructor(private httpClient: HttpClient) {}

  getTasks(): Observable<TaskModel[]> {
    return this.httpClient
      .get<TaskModel[]>(this.url)
      .pipe(retry(2), catchError(handleError));
  }

  getTasksByProjectID(projectID: string): Observable<TaskModel[]> {
    return this.httpClient
      .get<TaskModel[]>(`${this.url}project/${projectID}`)
      .pipe(retry(2), catchError(handleError));
  }

  createTask(task: TaskModel): Observable<ReturnModel> {
    return this.httpClient
      .post<ReturnModel>(this.url, task)
      .pipe(retry(2), catchError(handleError));
  }

  deleteTask(id: string): Observable<ReturnModel> {
    return this.httpClient
      .delete<ReturnModel>(this.url + id)
      .pipe(retry(2), catchError(handleError));
  }

  editTask(task: TaskModel): Observable<ReturnModel> {
    return this.httpClient
      .put<ReturnModel>(this.url + task.id, task)
      .pipe(retry(2), catchError(handleError));
  }
}
