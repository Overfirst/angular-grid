import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { GridColumn } from 'src/app/shared/interfaces'
import { ProductsService } from './products.service';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State } from "@progress/kendo-data-query";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {
  public columnConfig: GridColumn[] = [
    { alias: 'id', title: "Product ID" },
    { alias: 'name', title: "Product name" },
    { alias: 'inStock', title: "Units in stock" },
    { alias: 'cost', title: "Unit price" },
  ];

  public loading$ = new BehaviorSubject<boolean>(false);
  public currentData$ = this.takeProducts(0, 5);

  constructor(private service: ProductsService) {}

  public pageChanged(state: State): void {
    this.currentData$ = this.takeProducts(state.skip || 0, state.take || 0);
  }

  public takeProducts(from: number, to: number): Observable<GridDataResult> {
    this.loading$.next(true);
    return this.service.getProducts(from, to).pipe(
      finalize(() => this.loading$.next(false))
    );
  }
}