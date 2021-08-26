import {  Scope } from './Scope';

export class ScopeComponentDetails extends Scope{
    services: String[];
    systems: String[];
    constructor(name:string,systems:string[],services:string[]){
        super(name);
        this.systems=systems;
        this.services=services;
    }
}