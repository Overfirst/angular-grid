import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ApplicationsComponent } from './applications.component';
import { CommonTableModule } from 'src/app/shared-modules/common-table.module';

@NgModule({
    imports: [SharedModule, CommonTableModule],
    declarations: [ApplicationsComponent],
    exports: []
})
export class ApplicationsModule {}