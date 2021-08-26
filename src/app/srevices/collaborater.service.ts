import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";
import {ApiResponse} from "../model/api.response";
import {Collaborater} from "../model/Collaborater";


@Injectable({
  providedIn: 'root'
})
export class CollaboraterService {
  constructor(private http:HttpClient) { }
  baseUrl: string='http://localhost:8080/collaborater';

  getCollaboraters() : Observable<any>{
    return this.http.get<ApiResponse>(this.baseUrl+"/collaboraters");

  }
  GetCollaboraterById(id: number):Observable<any>{
    return this.http.get(this.baseUrl+"/collaboraters/"+ id);
  }
  CreateCollaborater(collaborater:Collaborater,idequipe:number): Observable<ApiResponse>{
    return this.http.post<ApiResponse>(this.baseUrl+"/collaboraters/"+idequipe, collaborater);

  }
  UpdateCollaborater(id: number, collaborater:Collaborater): Observable<ApiResponse>{
    return this.http.put<ApiResponse>(this.baseUrl+"/collaboraters/"+id, collaborater);

  }
  DeleteCollaborater(id:number):Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(this.baseUrl+"/collaboraters/"+id);
  }
}
