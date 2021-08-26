import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../model/api.response";
import {Project} from "../model/Project.js";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http:HttpClient) { }
  baseUrl: string='http://localhost:8080/project';

  getProjects() : Observable<any>{
    return this.http.get<ApiResponse>(this.baseUrl+"/projects");

  }
  GetProjectById(id: number):Observable<any>{
    return this.http.get(this.baseUrl+"/afficherproject/"+ id);
  }
  CreateProject(project:Project): Observable<ApiResponse>{
    return this.http.post<ApiResponse>(this.baseUrl, project);

  }
  UpdateProject(id: number, project:Project): Observable<ApiResponse>{
    return this.http.put<ApiResponse>(this.baseUrl+"/projects/"+id, project);

  }
  DeleteProject(id:number):Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(this.baseUrl+"/deleteproject/"+id);
  }
}
