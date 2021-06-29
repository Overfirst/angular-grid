import { NgModule } from "@angular/core";
import { CommonGridModule } from "src/app/shared-modules/common-grid.module";
import { SharedModule } from "../../shared/shared.module";
import { UsersComponent } from './users.component';
import { CommonTableModule } from "src/app/shared-modules/common-table.module";

@NgModule({
    imports: [SharedModule, CommonGridModule, CommonTableModule],
    declarations: [UsersComponent],
    exports: []
})
export class UsersModule {}