import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>('localhost:4200/users');
    }
    CreateCollaborater(u:User): Observable<any>{
        return this.http.post<any>("http://localhost:8080/register", u);
    
      }
}