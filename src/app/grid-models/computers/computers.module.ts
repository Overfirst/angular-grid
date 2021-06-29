import { NgModule } from "@angular/core";
import { CommonGridModule } from "src/app/shared-modules/common-grid.module";
import { SharedModule } from "../../shared/shared.module";
import { ComputersComponent } from './computers.component';

@NgModule({
    imports: [SharedModule, CommonGridModule],
    declarations: [ComputersComponent],
    exports: []
})
export class ComputersModule {}