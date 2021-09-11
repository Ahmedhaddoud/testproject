import { Equipe } from "app/model/Equipe";


export class User {
    id: number;
    firstName:string;
    lastName:string;
    email: string;
    adress:string;
    
    authorities: authorities;
    password:string;
    active: string;
    username: string;
    accessToken?: string;
    equipe:Equipe;
   
  
  
}

class authorities {
    authority: string;}