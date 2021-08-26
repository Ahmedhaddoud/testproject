import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProjectsComponent } from './list-projects/list-projects.component';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatSnackBarModule, MatStepperModule, MatTableModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
export const routes: Routes = [
  {
      path     : 'listProjects',
      component: ListProjectsComponent,
  }
]
@NgModule({
  
  declarations: [ListProjectsComponent],
  imports: [
    CommonModule,
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
      FuseSharedModule,
      Ng2SmartTableModule
   
     
  ],
 

  exports     : [ListProjectsComponent],
})
export class ProjectModule { }
