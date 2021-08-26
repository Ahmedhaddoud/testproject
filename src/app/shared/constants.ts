

export class AppConstants {

    public static  SYNTAXVERSION_REGEX="(?!\\.)(\\d+(\\.\\d+)+)(?:[-.][A-Z]+)?(?![\\d.])$";
    public static  NAME_REGEX="^[A-Za-z0-9 ]+$";
    public static  MAINTAINER_REGEX="^[A-Za-z]+[.][A-Za-z]+$";
    public static  VERSION_REGEX="^[0-9]+[.][0-9]+([.][0-9]+)?$";
    public static  KEY_REGEX="^[a-zA-Z][0-9a-zA-Z_ \\-]*(\\.{1}[a-zA-Z_ \\-]+)*$";

    


    public static  SCOPE_OPTIONS = [
        { name: "SYSTEM", value: 1 },
        { name: "SERVICE", value: 2 },
        { name: "COMPONENT", value: 3 },
        { name: "DEVICE", value: 4 },
        { name: "MODULE", value: 5 },
    
      ]

      public static TYPE_OPTIONS = [
        "STRING" ,"NUMBER", "INTEGER" ,"BOOLEAN","DATE" , "URL", "IP" 
    
      ]

      public static NATURE_OPTIONS = [
        "IMMUTABLE"
        , "MUTABLE",,"MUTABLE_GLOBAL", "MUTABLE_TENANT",
    
      ]

      public static DEPENDON_OPTIONS = [
        "ENVIRONMENT","COMPONENT", "THIRDPARTY"
      ]


 }