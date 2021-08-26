import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import {MatSnackBarModule, } from '@angular/material/snack-bar';
import { DescriptorComponent } from './descriptor.component';
import { DatePipe } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import { MatTableModule } from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import { DialogComponent } from '../dialog/dialog.component';
import { ViewDescriptorComponent } from '../view-descriptor/view-descriptor.component';
import { DialogSuccessComponent } from '../dialog-success/dialog-success.component';


const routes = [
    {
        path     : 'Descriptor',
        component: DescriptorComponent
    },
    
    {
        path     : 'ViewDescriptor',
        component: ViewDescriptorComponent
    }
   
];

@NgModule({
    declarations: [
        DescriptorComponent,
        DialogComponent,
        DialogSuccessComponent
        
    ],
    entryComponents: [DialogComponent,DialogSuccessComponent],
    providers: [DatePipe,
        
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatChipsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatCheckboxModule,
        TranslateModule,
        MatTableModule,
        MatExpansionModule,
        MatDialogModule,
        MatSnackBarModule,
        

        FuseSharedModule
    ],
    exports     : [
        DescriptorComponent,
        
    ]
})

export class DescriptorModule
{
}
