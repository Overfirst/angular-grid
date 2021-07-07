import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AddEvent, RemoveEvent, SaveEvent } from '@progress/kendo-angular-grid';
import { BehaviorSubject } from 'rxjs';
import { Computer } from 'src/app/shared/interfaces'
import { ComputersService } from './computers.service';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComputersComponent implements OnInit {
  public computers: Computer[] = [];
  public computers$ = new BehaviorSubject<Computer[]>([]);
  public loading$ = new BehaviorSubject<boolean>(false);

  public columnConfig$ = this.service.getColumnConfig();

  public readonly GRID_ID = 'COMPUTERS';

  constructor(private service: ComputersService) {}

  public ngOnInit(): void {
    this.loading$.next(true);
    this.service.getComputers().subscribe((computers: Computer[]) => {
      this.computers = computers;
      this.computers$.next(computers);
      this.loading$.next(false);
    });
  }

  public addComputer(event: AddEvent): void {
    this.computers = [event.dataItem, ...this.computers];
    this.computers$.next(this.computers);    
  }

  public editComputer(event: SaveEvent): void {
    const currentComputer: Computer = event.dataItem;
    const editedComputer: Computer = event.formGroup.value;

    this.computers = this.computers.map((computer: Computer) =>computer === currentComputer ? editedComputer : computer);
    this.computers$.next(this.computers);
  }

  public removeComputer(event: RemoveEvent): void {
    this.computers = this.computers.filter((computer: Computer) => computer !== event.dataItem);
    this.computers$.next(this.computers);
  }
}