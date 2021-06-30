import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { CommonTableModule } from "src/app/shared-modules/common-table.module";

@NgModule({
  declarations: [ProductsComponent],
  imports: [CommonModule, CommonTableModule]
})
export class ProductsModule { }
