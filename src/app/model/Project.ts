import {Equipe} from "./Equipe";
import {ConfigDescriptor} from "./ConfigDescriptor";
import {TempConfigDescriptor} from "./TempConfigDescriptor";

export class Project
{
  id:number;
  equipe:Equipe;
  name:string;
  description:string;
  startDate:string;
  endDate:string;
  configDescriptors:ConfigDescriptor[];
  tempConfigDescriptors:TempConfigDescriptor[];

}

