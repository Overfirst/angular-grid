import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GridColumn } from 'src/app/shared/interfaces'
import { ApplicationsService } from './applications.service';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State } from "@progress/kendo-data-query";

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationsComponent {
  public columnConfig: GridColumn[] = [
    { alias: 'name', title: "Name" },
    { alias: 'arch', title: "Architecture" },
    { alias: 'vendor', title: "Vendor" },
    { alias: 'size', title: "Size", hidden: true },
  ];

  public loading$ = new BehaviorSubject<boolean>(false);
  public currentData$ = this.takeApplications(0, 5);

  constructor(private service: ApplicationsService) {}

  public pageChanged(state: State): void {
    this.currentData$ = this.takeApplications(state.skip || 0, state.take || 0);
  }

  public takeApplications(from: number, to: number): Observable<GridDataResult> {
    this.loading$.next(true);
    return this.service.getApplications(from, to).pipe(
      tap(() => this.loading$.next(false))
    );
  }
}