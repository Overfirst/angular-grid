import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AzureHttpResponse, Product } from 'src/app/shared/interfaces';

@Injectable({providedIn: 'root'})
export class ProductsService {
    private readonly URL = 'https://odatasampleservices.azurewebsites.net/V4/Northwind/Northwind.svc/Products';

    constructor(private http: HttpClient) {}

    public getProducts(): Observable<Product[]> {
        return this.http.get<AzureHttpResponse>(this.URL).pipe(
            map((response: AzureHttpResponse) => {
                const products: Product[] = [...response.value!];
                return products;
            })
        );
    }
}