import { Injectable } from "@angular/core";
import { GridDataResult } from "@progress/kendo-angular-grid";
import { Observable, of } from "rxjs";

@Injectable({providedIn: 'root'})
export class ProductsService {
    public getProducts(from: number, to: number): Observable<GridDataResult> {
        return of({ data: [], total: 0 });
    }
}