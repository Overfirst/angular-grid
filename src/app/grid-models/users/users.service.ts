import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/interfaces';
import { GetDataService } from '../get-data.service';

@Injectable({providedIn: 'root'})
export class UsersService {
    private readonly URL = 'https://run.mocky.io/v3/c8414977-13bd-4747-9d83-784e5bb3bc51';

    constructor(private getDataService: GetDataService) {}

    public getUsers(): Observable<User[]> {
        return this.getDataService.get(this.URL);
    }
}