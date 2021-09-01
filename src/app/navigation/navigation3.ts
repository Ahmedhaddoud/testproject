import { FuseNavigation } from '@fuse/types';



 
export const navigation3: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'Desriptor',
                title    : 'Create / Edit Config Descriptor',
               // translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'add',
                url      : '/Descriptor',
                
            },
            {
                id       : 'DesriptorVisualize',
                title    : 'Visualize Descriptor',
               // translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'visibility',
                url      : 'http://localhost:1358/?appname=config-descriptor&url=http://localhost:9200&mode=edit',
                //port:1358
            },
            
            {
                id       : 'team',
                title    : 'TeamSection',
                translate: 'Team Section',
                type     : 'collapsable',
                icon     : 'layers',
                children : [
                    {
                        id        : 'listTeam',
                        title     : 'List of  Teams',
                        type      : 'item',
                        url       : '/listTeam',
                        exactMatch: true
                    }
                   
                   
                ]
            },
            {
                id       : 'project',
                title    : 'ProjectSection',
                translate: 'Project Section',
                type     : 'collapsable',
                icon     : 'layers',
                children : [
                    {
                        id        : 'listProjects',
                        title     : 'My projects',
                        type      : 'item',
                        url       : '/listProjects',
                        exactMatch: true
                    }
                ]
            },
            {
                id       : 'TempConfig',
                title    : 'TempConfigSection',
                translate: 'Template  Section',
                type     : 'collapsable',
                icon     : 'layers',
                children : [
                    {
                        id        : 'ListTemp',
                        title     : 'My templates ',
                        type      : 'item',
                        url       : '/ListTemp',
                        exactMatch: true
                    }
                ]
            }

        ]
    },
    

];
