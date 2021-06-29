import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonTableComponent } from 'src/app/shared/components/common-table/common-table.component';
import { CommonGridModule } from './common-grid.module';

@NgModule({
  declarations: [CommonTableComponent],
  imports: [SharedModule, CommonGridModule],
  exports: [CommonTableComponent]
})
export class CommonTableModule {}
