import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { ProjectModel } from '../../models/project.model';
import { ReturnModel } from '../../models/return.model';
import { handleError } from '../../shared/util';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  url = environment.apiUrl + '/projects/';

  constructor(private httpClient: HttpClient) {}

  getProjects(): Observable<ProjectModel[]> {
    return this.httpClient
      .get<ProjectModel[]>(this.url)
      .pipe(retry(2), catchError(handleError));
  }

  createProject(project: ProjectModel): Observable<ReturnModel> {
    return this.httpClient
      .post<ReturnModel>(this.url, project)
      .pipe(retry(2), catchError(handleError));
  }

  deleteProject(id: string): Observable<ReturnModel> {
    return this.httpClient
      .delete<ReturnModel>(this.url + id)
      .pipe(retry(2), catchError(handleError));
  }

  editProject(project: ProjectModel): Observable<ReturnModel> {
    return this.httpClient
      .put<ReturnModel>(this.url + project.id, project)
      .pipe(retry(2), catchError(handleError));
  }
}
