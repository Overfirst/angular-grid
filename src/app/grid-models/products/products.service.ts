import { Injectable } from "@angular/core";
import { GridDataResult } from "@progress/kendo-angular-grid";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { State, toODataString } from "@progress/kendo-data-query";

@Injectable({providedIn: 'root'})
export class ProductsService {
    private readonly URL = 'https://odatasampleservices.azurewebsites.net/V4/Northwind/Northwind.svc/Products';

    constructor(private http: HttpClient) {}

    public getProducts(from: number, to: number): Observable<GridDataResult> {
        const state: State = { skip: from, take: to };
        const query = `${toODataString(state)}&$count=true`;

        return this.http.get(`${this.URL}?${query}`).pipe(
            map((response: any) => {
                const result: GridDataResult = {
                    data: response['value'],
                    total: +response['@odata.count']
                };
                
                return result;
            })
        );
    }
}