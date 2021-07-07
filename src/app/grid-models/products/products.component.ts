import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AddEvent, RemoveEvent, SaveEvent } from '@progress/kendo-angular-grid';
import { BehaviorSubject } from 'rxjs';
import { ColumnsConfig, Product } from 'src/app/shared/interfaces'
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];
  public products$ = new BehaviorSubject<Product[]>([]);
  public loading$ = new BehaviorSubject<boolean>(false);
  
  public readonly GRID_ID = 'PRODUCTS';

  public columnConfig: ColumnsConfig = [
    { alias: 'ProductID', title: 'Product ID' },
    { alias: 'ProductName', title: 'Product name' },
    { alias: 'UnitPrice', title: 'Unit price' },
    { alias: 'UnitsInStock', title: 'Units in stock' },
  ];

  constructor(private service: ProductsService) {}

  public ngOnInit(): void {
    this.loading$.next(true);
    this.service.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.products$.next(products);
      this.loading$.next(false);
    });
  }

  public addProduct(event: AddEvent): void {
    this.products = [event.dataItem, ...this.products];
    this.products$.next(this.products);    
  }

  public editProduct(event: SaveEvent): void {
    const currentProduct: Product = event.dataItem;
    const editedProduct: Product = event.formGroup.value;

    this.products = this.products.map((product: Product) => product === currentProduct ? editedProduct : product);
    this.products$.next(this.products);
  }

  public removeProduct(event: RemoveEvent): void {
    this.products = this.products.filter((product: Product) => product !== event.dataItem);
    this.products$.next(this.products);
  }
}