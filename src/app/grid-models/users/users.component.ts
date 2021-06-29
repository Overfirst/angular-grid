import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageChangeEvent } from '@progress/kendo-angular-grid';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { GridColumn } from 'src/app/shared/interfaces'
import { UsersService } from './users.service';
import { GridDataResult } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  public columnConfig: GridColumn[] = [
    { alias: 'name', title: "Name", width: 300 },
    { alias: 'surname', title: "Surname", width: 300 },
    { alias: 'email', title: "Email", width: 600 },
    { alias: 'avatar', title: "Avatar", hidden: true },
  ];

  public loading$ = new BehaviorSubject<boolean>(false);
  public currentData$ = this.takeUsers(0, 5);

  constructor(private service: UsersService) {}

  public pageChanged(state: PageChangeEvent): void {
    this.currentData$ = this.takeUsers(state.skip, state.take);
  }

  public takeUsers(from: number, to: number): Observable<GridDataResult> {
    this.loading$.next(true);
    return this.service.getUsers(from, to).pipe(
      finalize(() => this.loading$.next(false))
    );
  }
}