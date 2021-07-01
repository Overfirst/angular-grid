import { Injectable } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { GetDataService } from '../get-data.service';

@Injectable({providedIn: 'root'})
export class UsersService {
    private readonly URL = 'https://run.mocky.io/v3/c8414977-13bd-4747-9d83-784e5bb3bc51';

    constructor(private getDataService: GetDataService) {}

    public getUsers(from: number, to: number): Observable<GridDataResult> {
        return this.getDataService.get(this.URL, from, to);
    }
}