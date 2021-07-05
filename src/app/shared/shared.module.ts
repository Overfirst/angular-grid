import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    GridModule,
    PDFModule,
    ExcelModule,
  } from '@progress/kendo-angular-grid';

import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';

import { RatingComponent } from './components/rating/rating.component';
import { DropDownListFilterComponent } from './components/dropdown-filter/dropdown-filter.component';
import { CommonGridConfiguratorComponent } from './components/common-grid-configurator/common-grid-configurator.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        GridModule,
        PDFModule,
        ExcelModule,
        InputsModule,
        DropDownListModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
      RatingComponent,
      DropDownListFilterComponent,
      CommonGridConfiguratorComponent
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        GridModule,
        PDFModule,
        ExcelModule,
        InputsModule,
        FormsModule,
        ReactiveFormsModule,
        DropDownListModule,
        RatingComponent,
        DropDownListFilterComponent,
        CommonGridConfiguratorComponent
    ]
})
export class SharedModule {}