import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../model/api.response";
import {TempConfigDescriptor} from "../model/TempConfigDescriptor";

@Injectable({
  providedIn: 'root'
})
export class TempConfigDescriptorService {

    constructor(private http:HttpClient) { }
    baseUrl: string='http://localhost:8080/tempconfigdescriptor';

    getTempConfigDescriptors() : Observable<ApiResponse>{
        return this.http.get<ApiResponse>(this.baseUrl+"/tempconfigdescriptors");

    }
    GetTempConfigDescriptorById(id: number):Observable<any>{
        return this.http.get(this.baseUrl+"/affichertempconfigdescriptor/"+id);
    }
    CreateTempConfigDescriptor(tempConfigDescriptor:TempConfigDescriptor,idequipe:number): Observable<ApiResponse>{
        return this.http.post<ApiResponse>(this.baseUrl+"/ajoutertempconfigdescriptor/"+idequipe, tempConfigDescriptor);

    }
    UpdateTempConfigDescriptor(id: number, tempConfigDescriptor:TempConfigDescriptor): Observable<ApiResponse>{
        return this.http.put<ApiResponse>(this.baseUrl+"/tempconfigdescriptors/"+id, tempConfigDescriptor);

    }
    DeleteTempConfigDescriptor(id:number):Observable<ApiResponse>{
        return this.http.delete<ApiResponse>(this.baseUrl+"/deletetempconfigdescriptor/"+id);
    }
}
