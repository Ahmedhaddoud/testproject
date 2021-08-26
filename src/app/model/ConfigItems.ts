
import { CanBeChangeBy } from './CanBeChangeBy';

import { dependency } from './dependecy';

export class ConfigItems{
  key : string;
  doc: string;
  typeI: string;
  canBeChangedBy:CanBeChangeBy;
  possibleValues: String[];
  defaultValue: string;
  pattern:string;
  nature: string;
  onChangeI:string;
  dependencies:dependency[];
  constructor( key : string,
    doc: string,
    typeI: string,
    canBeChangedBy:CanBeChangeBy,
    possibleValues: String[],
    defaultValue: string,
    pattern:string,
    nature: string,
    onChangeI:string,
    dependencies:dependency[]){
      
      this.key=key;
      this.canBeChangedBy=canBeChangedBy;
      this.defaultValue=defaultValue;
      this.dependencies=dependencies;
      this.doc=doc;
      this.nature=nature;
      this.onChangeI=onChangeI;
      this.pattern=pattern;
      this.possibleValues=possibleValues;
      this.typeI=typeI;

  }
}