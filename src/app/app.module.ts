import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { RatingComponent } from "./rating/rating.component";
import { SharedModule } from "./shared/shared.module"

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    RatingComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}