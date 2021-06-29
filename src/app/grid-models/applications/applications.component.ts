import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageChangeEvent } from '@progress/kendo-angular-grid';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { GridColumn } from 'src/app/shared/interfaces'
import { ApplicationsService } from './applications.service';
import { GridDataResult } from '@progress/kendo-angular-grid';

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

  public pageChanged(state: PageChangeEvent): void {
    this.currentData$ = this.takeApplications(state.skip, state.take);
  }

  public takeApplications(from: number, to: number): Observable<GridDataResult> {
    this.loading$.next(true);
    return this.service.getApplications(from, to).pipe(
      finalize(() => this.loading$.next(false))
    );
  }
}