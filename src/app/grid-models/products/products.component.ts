import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GridColumn } from 'src/app/shared/interfaces'
import { ProductsService } from './products.service';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State } from "@progress/kendo-data-query";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements AfterViewInit {
  @ViewChild('priceTemplate') public priceTemplate: TemplateRef<HTMLElement>;

  public columnConfig: GridColumn[] = [
    { alias: 'ProductID', title: "Product ID" },
    { alias: 'ProductName', title: "Product name" },
    { alias: 'UnitPrice', title: "Unit price" },
    { alias: 'UnitsInStock', title: "Units in stock" },
  ];

  ngAfterViewInit() {
    const columnPrice = this.columnConfig.find(column => column.alias === 'UnitPrice');

    if (columnPrice) {
      columnPrice.customTemplate = this.priceTemplate;
    }
  }

  public loading$ = new BehaviorSubject<boolean>(false);
  public currentData$ = this.takeProducts(0, 5);

  constructor(private service: ProductsService) {}

  public pageChanged(state: State): void {
    this.currentData$ = this.takeProducts(state.skip || 0, state.take || 0);
  }

  public takeProducts(from: number, to: number): Observable<GridDataResult> {
    this.loading$.next(true);
    return this.service.getProducts(from, to).pipe(
      tap(() => this.loading$.next(false))
    );
  }
}