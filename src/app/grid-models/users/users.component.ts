import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GridColumn } from 'src/app/shared/interfaces'
import { UsersService } from './users.service';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State } from "@progress/kendo-data-query";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements AfterViewInit {
  @ViewChild('ratingTemplate') ratingTemplate: TemplateRef<HTMLElement>; 

  public columnConfig: GridColumn[] = [
    { alias: 'name', title: "Name" },
    { alias: 'surname', title: "Surname" },
    { alias: 'email', title: "Email", width: 350 },
    { alias: 'avatar', title: "Avatar", hidden: true },
    { alias: 'rating', title: "Rating" },
  ];

  public loading$ = new BehaviorSubject<boolean>(false);
  public currentData$ = this.takeUsers(0, 5);

  constructor(private service: UsersService) {}

  ngAfterViewInit() {
    const ratingColumn = this.columnConfig.find(column => column.alias === 'rating');

    // todo: immutable
    if (ratingColumn) {
      ratingColumn.customTemplate = this.ratingTemplate
    }
  }

  public pageChanged(state: State): void {
    this.currentData$ = this.takeUsers(state.skip || 0, state.take || 0);
  }

  public takeUsers(from: number, to: number): Observable<GridDataResult> {
    this.loading$.next(true);
    return this.service.getUsers(from, to).pipe(
      tap(() => this.loading$.next(false))
    );
  }
}