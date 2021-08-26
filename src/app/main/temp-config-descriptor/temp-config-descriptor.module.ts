import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTemplateComponent } from './list-template/list-template.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatSnackBarModule, MatStepperModule, MatTableModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

export const routes: Routes = [
  {
      path     : 'ListTemp',
      component: ListTemplateComponent,
  }
]
@NgModule({
  declarations: [ListTemplateComponent],
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
  ]
})
export class TempConfigDescriptorModule { }
