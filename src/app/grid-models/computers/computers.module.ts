import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { ComputersComponent } from './computers.component';

@NgModule({
    imports: [SharedModule],
    declarations: [
        ComputersComponent
    ],
    exports: []
})
export class ComputersModule {}