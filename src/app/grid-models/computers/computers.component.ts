import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ComputersService } from './computers.service';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State } from "@progress/kendo-data-query";

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComputersComponent {
  public columnConfig$ = this.service.getColumnConfig();
  public loading$ = new BehaviorSubject<boolean>(false);
  public currentData$ = this.takeComputers(0, 5);

  constructor(private service: ComputersService) {}

  public pageChanged(state: State): void {
    this.currentData$ = this.takeComputers(state.skip || 0, state.take || 0);
  }

  public takeComputers(from: number, to: number): Observable<GridDataResult> {
    this.loading$.next(true);
    return this.service.getComputers(from, to).pipe(
      tap(() => this.loading$.next(false))
    );
  }
}