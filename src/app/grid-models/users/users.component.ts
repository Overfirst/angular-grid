import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { tap, delay, finalize } from 'rxjs/operators';
import { USERS } from 'src/app/grid-models/users/users.collection'
import { User, GridColumn, DataGroup } from 'src/app/shared/interfaces'

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

  public dataGroup: DataGroup = {
    data: this.users,
    columnConfig: this.columnConfig
  };

  public loading$ = new BehaviorSubject<boolean>(false);

  public data$ = of(this.dataGroup).pipe(
    tap(() => this.loading$.next(true)),
    delay(2500),
    finalize(() => this.loading$.next(false))
  );
}