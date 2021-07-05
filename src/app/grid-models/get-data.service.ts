import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { GridColumn } from '../shared/interfaces';

@Injectable({providedIn: 'root'})
export class GetDataService {
    constructor(private http: HttpClient) {}

    public get(url: string): Observable<any[]> {
        return this.http.get<any[]>(url)
            .pipe(switchMap(data => of(data).pipe(delay(0))))
    }

    public getColumnConfig(url: string): Observable<GridColumn[]> {
        return this.http.get<GridColumn[]>(url);
    }
}