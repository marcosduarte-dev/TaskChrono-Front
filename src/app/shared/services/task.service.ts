import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { TaskModel } from '../../models/task.model';
import { ReturnModel } from '../../models/return.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  url = 'http://localhost:8000/tasks/';

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  options = {
    headers: new HttpHeaders({ mode: 'no-cors' }),
  };

  getTasks(): Observable<TaskModel[]> {
    return this.httpClient
      .get<TaskModel[]>(this.url)
      .pipe(retry(2), catchError(this.handleError));
  }

  createTask(task: TaskModel): Observable<ReturnModel> {
    return this.httpClient
      .post<ReturnModel>(this.url, task)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteTask(id: string): Observable<ReturnModel> {
    return this.httpClient
      .delete<ReturnModel>(this.url + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  editTask(task: TaskModel): Observable<ReturnModel> {
    return this.httpClient
      .put<ReturnModel>(this.url + task.id, task)
      .pipe(retry(2), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage =
        `Erro Code: ${error.status}, ` + `mensage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
