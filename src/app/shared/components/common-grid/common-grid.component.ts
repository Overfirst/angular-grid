import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { AddEvent, CancelEvent, EditEvent, GridComponent, PagerSettings, RemoveEvent, SaveEvent } from '@progress/kendo-angular-grid';
import { GridColumn } from 'src/app/shared/interfaces';
import { CompositeFilterDescriptor, SortDescriptor } from '@progress/kendo-data-query';
import { Observable, of } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-common-grid',
  templateUrl: './common-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonGridComponent {
  public gridData: any[];

  public _loading = false;
  public _columnConfig: GridColumn[] = [];

  public defaultFilter: CompositeFilterDescriptor = {
    logic: 'and',
    filters: [],
  };

  public formGroup: FormGroup;

  @Input() public gridHeight = 900;
  @Input() public pageSize = 20;
  @Input() public sortable = true;
  @Input() public filterable = true;
  @Input() public pageable: boolean | PagerSettings = true;
  @Input() public groupable = true;
  @Input() public reorderable = true;
  @Input() public resizable = true;
  @Input() public searchable = true;
  @Input() public sort: SortDescriptor[] = [];

  @Input() public editable = false;
  @Input() public removable = false;
  @Input() public canCreate = false;

  @Input() public set columnConfig(config: GridColumn[]) {
    this._columnConfig  = config;

    this._columnConfig.forEach(column => {
      if (!column.validators) {
        column.validators = [];
      }

      if (!column.validators.includes(Validators.required)) {
        column.validators.push(Validators.required);
      }
    });
  } 

  @Input() public set loading(isLoading: boolean | null) {
    this._loading = isLoading !== null ? isLoading : false;
  }

  @Input() public set data(newData: any[] | null) {
    if (newData) {
      this.gridData = newData;
    }
  }

  @Output() public onItemEdit = new EventEmitter<SaveEvent>();
  @Output() public onItemRemove = new EventEmitter<RemoveEvent>();
  @Output() public onItemAdd = new EventEmitter<AddEvent>();

  public resolveDefault<T>(value: T | undefined, defaultValue: T): T {
    if (value === undefined) {
      return defaultValue;
    }

    return value;
  }

  public resolveDictionary(column: GridColumn): Observable<{name: string}[]> {
    return column.customFilter!.dictionary$ || of(column.customFilter!.dictionary || []);
  }

  public editedRowIndex = 0;

  public editHandler(event: EditEvent): void {
    this.closeEditor(event.sender);

    const controls: { [key: string]: AbstractControl } = {};

    this._columnConfig.forEach((column: GridColumn) => {
      controls[column.alias] = new FormControl(event.dataItem[column.alias], column.validators)
    });

    this.formGroup = new FormGroup(controls);
    this.editedRowIndex = event.rowIndex;
    event.sender.editRow(event.rowIndex, this.formGroup);
  }

  public cancelHandler(event: CancelEvent): void {
    this.closeEditor(event.sender, event.rowIndex);
  }

  public saveHandler(event: SaveEvent): void {
    if (event.isNew) {
      this.onItemAdd.emit(event);
    } else {
      this.onItemEdit.emit(event);
    }

    this.closeEditor(event.sender);
  }

  public addHandler(event: AddEvent): void {
    const sender: GridComponent = event.sender;
    this.closeEditor(sender);

    const controls: { [key: string]: AbstractControl } = {};

    this._columnConfig.forEach((column: GridColumn) =>
      controls[column.alias] = new FormControl('', column.validators)
    );

    this.formGroup = new FormGroup(controls);
    sender.addRow(this.formGroup);
  }

  public removeHandler(event: RemoveEvent): void {
    this.onItemRemove.emit(event);
  }

  public closeEditor(grid: GridComponent, rowIndex: number = this.editedRowIndex): void {
    grid.closeRow(rowIndex);
    this.editedRowIndex = -1;
  }
}