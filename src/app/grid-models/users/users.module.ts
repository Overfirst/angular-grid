import { NgModule } from "@angular/core";
import { CommonGridModule } from "src/app/shared-modules/common-grid.module";
import { SharedModule } from "../../shared/shared.module";
import { UsersComponent } from './users.component';

@NgModule({
    imports: [SharedModule, CommonGridModule],
    declarations: [UsersComponent],
    exports: []
})
export class UsersModule {}