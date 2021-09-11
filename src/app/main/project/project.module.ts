import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProjectsComponent } from './list-projects/list-projects.component';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule, MatSelectModule, MatSnackBarModule, MatStepperModule, MatTableModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AddProjectComponent } from './add-project/add-project.component';
import { AssignProjectTeamComponent } from './assign-project-team/assign-project-team.component';
export const routes: Routes = [
  {
      path     : 'listProjects',
      component: ListProjectsComponent,
  },
  {
    path     : 'addProject',
    component: AddProjectComponent,
}, {
  path     : 'assignProjectTeam',
  component: AssignProjectTeamComponent,
}

  
]
@NgModule({
  
  declarations: [ListProjectsComponent, AddProjectComponent, AssignProjectTeamComponent],
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
      Ng2SmartTableModule,
      MatDatepickerModule,
      MatNativeDateModule
   
     
  ],
 

  exports     : [ListProjectsComponent,AddProjectComponent,AssignProjectTeamComponent],
})
export class ProjectModule { }
