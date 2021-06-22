import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { RatingComponent } from "./rating/rating.component";
import { SharedModule } from "./shared/shared.module"

import { UsersModule } from "./grid-models/users/users.module";
import { ComputersModule } from "./grid-models/computers/computers.module";
import { ApplicationsModule } from "./grid-models/applications/applications.module";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    UsersModule,
    ComputersModule,
    ApplicationsModule
  ],
  declarations: [
    AppComponent,
    RatingComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}