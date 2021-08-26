import { Scope } from './Scope';

export class ScopeModuleDetails extends Scope{
    devices: string[];
    systems: string[];
    constructor(name:string,systems:string[],devices:string[]){
        super(name);
        this.systems=systems;
        this.devices=devices;
    }
}