import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageChangeEvent } from '@progress/kendo-angular-grid';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, delay, finalize, take } from 'rxjs/operators';
import { USERS } from 'src/app/grid-models/users/users.collection'
import { User, GridColumn } from 'src/app/shared/interfaces'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  public users: User[] = USERS;
  
  public columnConfig: GridColumn[] = [
    { alias: 'name', title: "Name", width: 300 },
    { alias: 'surname', title: "Surname", width: 300 },
    { alias: 'email', title: "Email", width: 600 },
    { alias: 'avatar', title: "Avatar", hidden: true },
  ];

  public loading$ = new BehaviorSubject<boolean>(false);
  public total = USERS.length;

  public data$ = this.takeUsers(0, 10);

  public pageChanged(state: PageChangeEvent): void {
    this.data$ = this.takeUsers(state.skip, state.take);
    console.log(state);
  }

  public takeUsers(from: number, to: number): Observable<User[]> {
    const takenUsers = [];

    let maxCount = from + to;

    if (maxCount > this.total) {
      maxCount = this.total;
    }

    for (let i = from; i < maxCount; i++) {
      takenUsers.push(USERS[i]);
    }

    return of(takenUsers).pipe(
      tap(() => this.loading$.next(true)),
      delay(1500),
      finalize(() => this.loading$.next(false))
    );
  }
}