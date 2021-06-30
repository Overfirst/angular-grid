import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import {
    GridModule,
    PDFModule,
    ExcelModule,
  } from "@progress/kendo-angular-grid";

import { InputsModule } from "@progress/kendo-angular-inputs";
import { RatingComponent } from './components/rating/rating.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        GridModule,
        PDFModule,
        ExcelModule,
        InputsModule
    ],
    declarations: [
      RatingComponent
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        GridModule,
        PDFModule,
        ExcelModule,
        InputsModule,
        RatingComponent
    ]
})
export class SharedModule {}