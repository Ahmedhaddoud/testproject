
import { ConfigItems } from './ConfigItems';
import { DescriptorConfig } from './DescriptorConfig';
import { Scope } from './Scope';
export class Descriptor{

    descriptorConfig: DescriptorConfig;
    scope : Scope;
    configItems : ConfigItems[];
    constructor(descriptorConfig:DescriptorConfig,configItems:ConfigItems[]){
        this.descriptorConfig=descriptorConfig;
       
        this.configItems=configItems;
    }
    
    public setScope(v : Scope) {
        this.scope = v;
    }
    
}