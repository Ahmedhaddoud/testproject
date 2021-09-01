import { FuseNavigation } from '@fuse/types';



 
export const navigation4: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'validation',
                title    : 'Config Descriptors Validation',
               // translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'check',
                url      : '/Validation',
                
            }

        ]
    },
    

];
