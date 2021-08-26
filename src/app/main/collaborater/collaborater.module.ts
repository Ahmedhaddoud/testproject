import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { AddCollaboraterComponent } from './add-collaborater/add-collaborater.component';
import { ListCollaboratersComponent } from './list-collaboraters/list-collaboraters.component';
import { MatButtonModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatSnackBarModule, MatStepperModule, MatTableModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

export const routes: Routes = [
  {
      path     : 'list',
      component: ListCollaboratersComponent,
  },
  {
    path     : 'collaborater/add',
    component: AddCollaboraterComponent,
}
  
]
@NgModule({
  declarations: [ AddCollaboraterComponent, ListCollaboratersComponent],
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
 

  exports     : [ListCollaboratersComponent],
})
export class CollaboraterModule { }
