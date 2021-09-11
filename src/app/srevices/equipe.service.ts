import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../model/api.response";
import {Equipe} from "../model/Equipe";
import { Collaborater } from 'app/model/Collaborater';
import { Project } from 'app/model/Project';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {
  constructor(private http:HttpClient) { }
  baseUrl: string='http://localhost:8080/equipe';

  getEquipes() : Observable<any>{
    return this.http.get<ApiResponse>(this.baseUrl+"/equipes");
   

  }
  GetEquipeById(id: number):Observable<any>{
    return this.http.get(this.baseUrl+"/afficherequipe/"+ id);
  }
  GetEquipeByUser(id: number):Observable<any>{
    return this.http.get(this.baseUrl+"/afficherequipeUser/"+ id);
  }
  CreateEquipe(equipe:Equipe): Observable<any>{
    return this.http.post<ApiResponse>(this.baseUrl+"/ajouterequipe", equipe);

  }
  UpdateEquipe(id: number, equipe:Equipe): Observable<ApiResponse>{
    return this.http.put<ApiResponse>(this.baseUrl+"/equipes/"+id, equipe);

  }
  DeleteEquipe(id:number):Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(this.baseUrl+"/deleteequipe/"+id);
  }
  AssignCollaboraterEquipe(ide: number, c:Collaborater): Observable<ApiResponse>{
    console.log("success service");
  return this.http.put<ApiResponse>(this.baseUrl+"/assign/"+ide, c);
  
}
AssignProjectEquipe(ide: number, p:Project): Observable<ApiResponse>{
  console.log("success service");
return this.http.put<ApiResponse>(this.baseUrl+"/assignProjet/"+ide, p);

}
GetCollaboraterByTeam(id: number):Observable<any>{
  return this.http.get("http://localhost:8080/collaborater/collaboratersEquipe/"+id);
  
}
}
