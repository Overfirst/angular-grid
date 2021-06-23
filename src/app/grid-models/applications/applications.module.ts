import { NgModule } from "@angular/core";
import { CommonGridModule } from "src/app/shared-modules/common-grid/common-grid.module";
import { SharedModule } from "../../shared/shared.module";
import { ApplicationsComponent } from './applications.component';

@NgModule({
    imports: [SharedModule, CommonGridModule],
    declarations: [ApplicationsComponent],
    exports: []
})
export class ApplicationsModule {}