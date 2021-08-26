import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../model/api.response";
import {ConfigDescriptor} from "../model/ConfigDescriptor";



@Injectable({
  providedIn: 'root'
})
export class ConfigDescriptorService {


  constructor(private http:HttpClient) { }
  baseUrl: string='http://localhost:8080/configdescriptor';

  getConfigDescriptors() : Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.baseUrl+"/configdescriptors");

  }
  GetConfigDescriptorById(id: number):Observable<any>{
    return this.http.get(this.baseUrl+"/afficherconfigdescriptor/"+id);
  }
  CreateConfigDescriptor(configDescriptor:ConfigDescriptor): Observable<ApiResponse>{
    return this.http.post<ApiResponse>(this.baseUrl+"/ajouterconfigdescriptor", configDescriptor);

  }
  UpdateConfigDescriptor(id: number, configDescriptor:ConfigDescriptor): Observable<ApiResponse>{
    return this.http.put<ApiResponse>(this.baseUrl+"/configdescriptors/"+configDescriptor.id, configDescriptor);

  }
  DeleteConfigDescriptor(id:number):Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(this.baseUrl+"/deleteconfigdescriptor/"+id);
  }
}
