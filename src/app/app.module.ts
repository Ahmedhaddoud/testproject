import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { MatMomentDateModule, MomentDateModule } from "@angular/material-moment-adapter";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { TranslateModule } from "@ngx-translate/core";
import "hammerjs";
import { ReactiveFormsModule } from '@angular/forms';
import { FuseModule } from "@fuse/fuse.module";
import { FuseSharedModule } from "@fuse/shared.module";
import { FormGroup } from "@angular/forms";
import {
    FuseProgressBarModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,
} from "@fuse/components";

import { fuseConfig } from "app/fuse-config";

import { AppComponent } from "app/app.component";
import { LayoutModule } from "app/layout/layout.module";
import { DescriptorModule } from "app/main/descriptor/descriptor.module";
import { HttpModule } from "@angular/http";
import { ViewDescriptorComponent } from "./main/view-descriptor/view-descriptor.component";
import { DialogSuccessComponent } from "./main/dialog-success/dialog-success.component";
import { LoginModule } from "./main/pages/authentication/login/login.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";

import { CollaboraterModule } from "./main/collaborater/collaborater.module";
import { Ng2SmartTableModule }from "ng2-smart-table";
import { CompleterService } from "@akveo/ng2-completer"
import { TeamModule } from "./main/team/team.module";
import { ProjectModule } from "./main/project/project.module";
import { TempConfigDescriptorModule } from "./main/temp-config-descriptor/temp-config-descriptor.module";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDialog, MatDialogModule, MatGridListModule, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DIALOG_DATA } from "@angular/material";
import { MY_DATE_FORMATS } from "./shared/my-date-formats";
import { DialogComponent } from "./main/dialog/dialog.component";
const appRoutes: Routes = [
    {
        path        : 'pages',
        loadChildren: './main/pages/pages.module#PagesModule'
    },
    {
        path        : 'apps',
        loadChildren: './main/apps/apps.module#AppsModule'
    },
   /* {
        path: "login",
        loadChildren: './login/login.module#LoginModule'
    },*/
    {
        path: "validation",
        redirectTo: "Validation",
    },
    {
        path: "**",
        redirectTo: "Descriptor",
    },
    {
        path: "DesriptorVisualize",
        redirectTo:
            "http://localhost:1358/?appname=config-descriptor&url=http://localhost:9200&mode=edit",
    },
    {
        path: "collaborater",
        loadChildren:
            "./main/collaborater/collaborater.module#CollaboraterModule",
    },
    {
        path: "team",
        loadChildren:
            "./main/team/team.module#TeamModule",
    }, {
        path: "project",
        loadChildren:
            "./main/project/project.module#ProjectModule",
    },
  /*  {
        path: "TempConfig",
        loadChildren:
            "./main/tempconfigdescriptor/tempconfigdescriptor.module#TempConfigDescriptorModule",
            
    }
    */
   
];

@NgModule({
    declarations: [AppComponent, ViewDescriptorComponent],
    
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,
        HttpModule,
        // Material
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatInputModule,
        MatDatepickerModule,
       Ng2SmartTableModule,
       CollaboraterModule,
       DescriptorModule,
       TeamModule,
       ProjectModule,
       TempConfigDescriptorModule,
       MatDatepickerModule,
        MatNativeDateModule,
        MomentDateModule,
        MatDialogModule, 
        
      
    ],
    exports: [MatButtonModule,MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatNativeDateModule,
        MatDatepickerModule,
     
    ],
    providers: [
        MatDatepickerModule,
        MatNativeDateModule,

        {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
      
        ],
    bootstrap: [AppComponent],
})

export class AppModule {}
