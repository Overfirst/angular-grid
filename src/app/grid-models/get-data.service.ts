import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { GridDataResult } from "@progress/kendo-angular-grid";
import { of } from "rxjs";
import { map, delay, switchMap } from "rxjs/operators";
import { GridColumn } from "../shared/interfaces";

@Injectable({providedIn: 'root'})
export class GetDataService {
    constructor(private http: HttpClient) {}

    public get(path: string, from: number, to: number): Observable<GridDataResult> {
        return this.http.get<any[]>(path)
            .pipe(
                map(fullData => {
                    const takenData: any[] = [];

                    let maxCount = from + to;

                    if (maxCount > fullData.length) {
                        maxCount = fullData.length;
                    }

                    for (let i = from; i < maxCount; i++) {
                        takenData.push(fullData[i]);
                    }

                    return { data: takenData, total: fullData.length };
                }),
                switchMap(data => of(data).pipe(delay(1500))),
            )
    }

    public getColumnConfig(url: string): Observable<GridColumn[]> {
        return this.http.get<GridColumn[]>(url);
    }
}