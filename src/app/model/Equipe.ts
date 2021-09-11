import {Project} from "./Project";
import {Collaborater} from "./Collaborater";

export class Equipe{
    
  description:string;
  id:number;
   name:string;

  

  users :Collaborater[];
  projects :Project[];

}
