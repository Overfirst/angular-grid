import { Injectable } from "@angular/core";
import { GridDataResult } from "@progress/kendo-angular-grid";
import { Observable } from "rxjs";
import { GetDataService } from "../get-data.service";

@Injectable({providedIn: 'root'})
export class ApplicationsService {
    private readonly URL = 'https://run.mocky.io/v3/591b3014-807b-4123-8ec1-39f30cdcdd88';

    constructor(private getDataService: GetDataService) {}

    public getApplications(from: number, to: number): Observable<GridDataResult> {
        return this.getDataService.get(this.URL, from, to);
    }
}