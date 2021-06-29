import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { ComputersComponent } from './computers.component';
import { CommonTableModule } from "src/app/shared-modules/common-table.module";

@NgModule({
    imports: [SharedModule, CommonTableModule],
    declarations: [ComputersComponent],
    exports: []
})
export class ComputersModule {}