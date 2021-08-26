import { Scope } from './Scope';

export class ScopeServiceDetails extends Scope{
    systems: string[];
    constructor(name:string,systems:string[]){
        super(name);
        this.systems=systems;
    }
}