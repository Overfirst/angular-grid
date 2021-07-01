import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import {
    GridModule,
    PDFModule,
    ExcelModule,
  } from "@progress/kendo-angular-grid";

import { DropDownListModule } from "@progress/kendo-angular-dropdowns";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { RatingComponent } from './components/rating/rating.component';
import { DropDownListFilterComponent } from "./components/dropdown-filter/dropdown-filter.component";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        GridModule,
        PDFModule,
        ExcelModule,
        InputsModule,
        DropDownListModule
    ],
    declarations: [
      RatingComponent,
      DropDownListFilterComponent
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        GridModule,
        PDFModule,
        ExcelModule,
        InputsModule,
        DropDownListModule,
        RatingComponent,
        DropDownListFilterComponent
    ]
})
export class SharedModule {}