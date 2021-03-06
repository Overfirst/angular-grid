import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ColumnsConfig, Computer } from 'src/app/shared/interfaces';
import { GetDataService } from '../get-data.service';

@Injectable({providedIn: 'root'})
export class ComputersService {
    private readonly DATA_URL = 'https://run.mocky.io/v3/082ab2d3-5dd0-48f8-b448-73497de7264e';
    private readonly CONFIG_URL = 'https://run.mocky.io/v3/d29116f0-a9ad-4475-9353-915cd9dabf32';

    constructor(private getDataService: GetDataService) {}

    public getComputers(): Observable<Computer[]> {
        return this.getDataService.get(this.DATA_URL);
    }

    public getColumnConfig(): Observable<ColumnsConfig> {
        return this.getDataService.getColumnConfig(this.CONFIG_URL);
    }
}