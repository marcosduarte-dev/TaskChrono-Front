import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { ProjectModel } from '../../models/project.model';
import { ReturnModel } from '../../models/return.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  url = 'http://localhost:8000/projects/';

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  options = {
    headers: new HttpHeaders({ mode: 'no-cors' }),
  };

  getProjects(): Observable<ProjectModel[]> {
    return this.httpClient
      .get<ProjectModel[]>(this.url)
      .pipe(retry(2), catchError(this.handleError));
  }

  createProject(project: ProjectModel): Observable<ReturnModel> {
    return this.httpClient
      .post<ReturnModel>(this.url, project)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteProject(id: string): Observable<ReturnModel> {
    return this.httpClient
      .delete<ReturnModel>(this.url + id)
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
