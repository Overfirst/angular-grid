import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonGridComponent } from 'src/app/shared/components/common-grid/common-grid.component';

@NgModule({
  declarations: [CommonGridComponent],
  imports: [SharedModule],
  exports: [CommonGridComponent]
})
export class CommonGridModule {}
