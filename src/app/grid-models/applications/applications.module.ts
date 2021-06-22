import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { ApplicationsComponent } from './applications.component';

@NgModule({
    imports: [SharedModule],
    declarations: [
        ApplicationsComponent
    ],
    exports: []
})
export class ApplicationsModule {}