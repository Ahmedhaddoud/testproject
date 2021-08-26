

export class DescriptorConfig {
    SyntaxVersion: string;
    name: string;
    maintainer:string;
    description: string;
    scope: string;
    version:string;
   
    constructor(SyntaxVersion:string,name:string,maintainer:string,description :string,scope:string,version:string){
        this.SyntaxVersion=SyntaxVersion;
        this.name=name;
        this.maintainer=maintainer;
        this.description=description;
        this.scope=scope;
        this.version=version;
    }

}