import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { User } from "../_models";
import { Router } from "@angular/router";
import { FuseNavigation } from "@fuse/types";
import { navigation2 } from "app/navigation/navigation2";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public navigation: any;


    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(
            JSON.parse(localStorage.getItem("currentUser"))
        );
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
   

    login(username: string, password: string) {
        return this.http
            .post<any>("http://localhost:8080/signin", {
                email: username,
                password: password,
            })
            .pipe(
                map((user) => {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem("currentUser", JSON.stringify(user));
                    //localStorage.removeItem('currentUser')
                    //this.router.navigate(['/login']);
                    this.currentUserSubject.next(user);
                    return user;
                })
            );
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem("currentUser");
        console.log("clicked");
        this.currentUserSubject = new BehaviorSubject<User>(null);
        this.router.navigate(["pages/auth/login"]);
    }
}
