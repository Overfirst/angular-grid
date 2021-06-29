import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageChangeEvent } from '@progress/kendo-angular-grid';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { GridColumn } from 'src/app/shared/interfaces'
import { ComputersService } from './computers.service';
import { GridDataResult } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComputersComponent {
  public columnConfig: GridColumn[] = [
    { alias: 'name', title: "Name" },
    { alias: 'os', title: "OS" },
    { alias: 'arch', title: "Architecture" },
    { alias: 'ram', title: "RAM" },
    { alias: 'cpu', title: "CPU" },
  ];

  public loading$ = new BehaviorSubject<boolean>(false);
  public currentData$ = this.takeComputers(0, 5);

  constructor(private service: ComputersService) {}

  public pageChanged(state: PageChangeEvent): void {
    this.currentData$ = this.takeComputers(state.skip, state.take);
  }

  public takeComputers(from: number, to: number): Observable<GridDataResult> {
    this.loading$.next(true);
    return this.service.getComputers(from, to).pipe(
      finalize(() => this.loading$.next(false))
    );
  }
}