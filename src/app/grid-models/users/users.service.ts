import { Injectable } from "@angular/core";
import { GridDataResult } from "@progress/kendo-angular-grid";
import { Observable } from "rxjs";
import { GetDataService } from "../get-data.service";

@Injectable({providedIn: 'root'})
export class UsersService {
    private readonly URL = 'https://run.mocky.io/v3/a0d548da-3021-45d1-bcb1-4b84b11b68d5';

    constructor(private getDataService: GetDataService) {}

    public getUsers(from: number, to: number): Observable<GridDataResult> {
        return this.getDataService.get(this.URL, from, to);
    }
}