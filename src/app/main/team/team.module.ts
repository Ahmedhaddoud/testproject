import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTeamComponent } from './list-team/list-team.component';
import { RouterModule, Routes } from '@angular/router';
import { AddTeamComponent } from './add-team/add-team.component';
import { MatButtonModule, MatButtonToggleModule, MatCheckboxModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatSelectModule, MatSlideToggleModule, MatSnackBarModule, MatStepperModule, MatTableModule, MatTabsModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MyTeamComponent } from './my-team/my-team.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FuseDemoModule, FuseHighlightModule } from '@fuse/components';




export const routes: Routes = [
  {
      path     : 'listTeam',
      component: ListTeamComponent,
  },
  {
    path     : 'addTeam',
    component: AddTeamComponent,
}, {
  path     : 'myTeam',
  component: MyTeamComponent,
}

]
@NgModule({
  declarations: [ListTeamComponent, AddTeamComponent, MyTeamComponent],
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
     
      MatSnackBarModule,
      FuseSharedModule,
      Ng2SmartTableModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatIconModule,
      MatListModule,
      MatMenuModule,
      MatSelectModule,
      MatSlideToggleModule,
      MatTabsModule,

      NgxChartsModule,

      FuseSharedModule,
      FuseDemoModule,
      FuseHighlightModule,
     
  ]
})

export class TeamModule { }
