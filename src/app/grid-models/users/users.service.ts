import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "src/app/shared/interfaces";
import { GridDataResult } from "@progress/kendo-angular-grid";
import { of } from "rxjs";
import { map, delay, switchMap } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class UsersService {
    constructor(private http: HttpClient) {}

    public getUsers(from: number, to: number): Observable<GridDataResult> {
        return this.http.get<User[]>('https://run.mocky.io/v3/a0d548da-3021-45d1-bcb1-4b84b11b68d5')
            .pipe(
                map(users => {
                    const takenUsers: User[] = [];

                    let maxCount = from + to;

                    if (maxCount > users.length) {
                        maxCount = users.length;
                    }

                    for (let i = from; i < maxCount; i++) {
                        takenUsers.push(users[i]);
                    }

                    return { data: takenUsers, total: users.length };
                }),
                switchMap(data => of(data).pipe(delay(1500))),
            )
    }
}