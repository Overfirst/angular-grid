import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GridDataResult } from "@progress/kendo-angular-grid";
import { Observable, of } from "rxjs";
import { GridColumn } from "src/app/shared/interfaces";
import { GetDataService } from "../get-data.service";

@Injectable({providedIn: 'root'})
export class ComputersService {
    private readonly DATA_URL = 'https://run.mocky.io/v3/082ab2d3-5dd0-48f8-b448-73497de7264e';
    private readonly CONFIG_URL = 'https://run.mocky.io/v3/8bde9006-22c3-4302-b8e7-8f506bcd96d0';

    constructor(private getDataService: GetDataService) {}

    public getComputers(from: number, to: number): Observable<GridDataResult> {
        return this.getDataService.get(this.DATA_URL, from, to);
    }

    public getColumnConfig(): Observable<GridColumn[]> {
        return this.getDataService.getColumnConfig(this.CONFIG_URL);
    }
}