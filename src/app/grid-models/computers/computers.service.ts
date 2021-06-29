import { Injectable } from "@angular/core";
import { GridDataResult } from "@progress/kendo-angular-grid";
import { Observable } from "rxjs";
import { GetDataService } from "../get-data.service";

@Injectable({providedIn: 'root'})
export class ComputersService {
    private readonly URL = 'https://run.mocky.io/v3/082ab2d3-5dd0-48f8-b448-73497de7264e';

    constructor(private getDataService: GetDataService) {}

    public getComputers(from: number, to: number): Observable<GridDataResult> {
        return this.getDataService.get(this.URL, from, to);
    }
}