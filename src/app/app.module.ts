import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import {
  GridModule,
  PDFModule,
  ExcelModule,
} from "@progress/kendo-angular-grid";
import { InputsModule } from "@progress/kendo-angular-inputs";

import { AppComponent } from "./app.component";
import { RatingComponent } from "./rating/rating.component";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GridModule,
    InputsModule,
    PDFModule,
    ExcelModule,
  ],
  declarations: [AppComponent, RatingComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}