import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit,  } from '@angular/core';
import { AddEvent, CancelEvent, ColumnResizeArgs, EditEvent, GridComponent, PagerSettings, RemoveEvent, SaveEvent } from '@progress/kendo-angular-grid';
import { ColumnsConfig, GridColumn } from 'src/app/shared/interfaces';
import { CompositeFilterDescriptor, SortDescriptor } from '@progress/kendo-data-query';
import { Observable, of } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfiguratorService } from './configurator.service';

@Component({
  selector: 'app-common-grid',
  templateUrl: './common-grid.component.html',
  styleUrls: ['./common-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonGridComponent implements OnInit {
  public gridData: any[];

  public _loading = false;
  public _columnConfig: ColumnsConfig = [];
  public selectedView = this.service.DEFAULT_KEY;

  public defaultFilter: CompositeFilterDescriptor = {
    logic: 'and',
    filters: [],
  };

  public formGroup: FormGroup;
  public configuratorOpened = false;
  public nowEdits = false;
  public editedRowIndex = 0;

  constructor(public service: ConfiguratorService) {}

  @Input() public gridHeight = 900;
  @Input() public pageSize = 20;

  @Input() public sortable = true;
  @Input() public filterable = true;
  @Input() public groupable = true;
  @Input() public reorderable = true;
  @Input() public resizable = true;
  @Input() public searchable = true;
  @Input() public editable = false;
  @Input() public removable = false;
  @Input() public canCreate = false;
  @Input() public allowConfigurator = true;

  @Input() public sort: SortDescriptor[] = [];
  @Input() public pageable: boolean | PagerSettings = true;
  @Input() public gridID: string | null = null;

  @Input() public set columnConfig(config: ColumnsConfig) {
    this._columnConfig = config;

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

  public ngOnInit(): void {
    if (this.gridID) {
      this.service.setDefaultConfig(this.gridID, this._columnConfig);
    }
  }

  public resolveDefault<T>(value: T | undefined, defaultValue: T): T {
    if (value === undefined) {
      return defaultValue;
    }

    return value;
  }

  public resolveDictionary(column: GridColumn): Observable<{name: string}[]> {
    return column.customFilter!.dictionary$ || of(column.customFilter!.dictionary || []);
  }

  public editHandler(event: EditEvent): void {
    this.closeEditor(event.sender);

    const controls: { [key: string]: AbstractControl } = {};

    this._columnConfig.forEach((column: GridColumn) =>
      controls[column.alias] = new FormControl(event.dataItem[column.alias], column.validators)
    );

    this.formGroup = new FormGroup(controls);
    this.editedRowIndex = event.rowIndex;
    event.sender.editRow(event.rowIndex, this.formGroup);
    this.nowEdits = true;
  }

  public cancelHandler(event: CancelEvent): void {
    this.closeEditor(event.sender, event.rowIndex);
    this.nowEdits = false;
  }

  public saveHandler(event: SaveEvent): void {
    if (event.isNew) {
      this.onItemAdd.emit(event);
    } else {
      this.onItemEdit.emit(event);
    }

    this.closeEditor(event.sender);
    this.nowEdits = false;
  }

  public addHandler(event: AddEvent): void {
    const sender: GridComponent = event.sender;
    this.closeEditor(sender);

    const controls: { [key: string]: AbstractControl } = {};

    this._columnConfig.forEach((column: GridColumn) => {
      if (!column.hidden) {
        controls[column.alias] = new FormControl('', column.validators)
      }
    });

    this.formGroup = new FormGroup(controls);
    sender.addRow(this.formGroup);
    this.nowEdits = true;
  }

  public removeHandler(event: RemoveEvent): void {
    this.onItemRemove.emit(event);
  }

  public columnResize(args: ColumnResizeArgs[]): void {
    const newWidths = args.map(arg => arg.newWidth);
    const columns = args.map(arg => arg.column);

    columns.forEach((column: any, index) => {
      const needColumn = this._columnConfig.find(col => col.alias === column.field);
      
      if (needColumn) {
        needColumn.width = newWidths[index];
      }
    });

    this.service.updateCurrentView(this.gridID!, this.selectedView, this._columnConfig);
  }

  public filterChange(filter: CompositeFilterDescriptor): void {
    console.log('filterChange:', filter);
  }

  public sortChange(sort: SortDescriptor[]): void {
    console.log('sortChange', sort);
  }

  public closeEditor(grid: GridComponent, rowIndex: number = this.editedRowIndex): void {
    grid.closeRow(rowIndex);
    this.editedRowIndex = -1;
  }

  public viewSelectionChanged(view: string): void {
    this.selectedView = view;
    const loadedConfig = this.service.loadConfig(this.gridID!, view);

    console.log('changed:', loadedConfig);

    this._columnConfig = this._columnConfig.map((column, index) => {
      const clonedColumn = {...column};
      const newColumn = loadedConfig[index];

      return {...clonedColumn, ...newColumn};
    })
  }

  public getViews(): string[] {
    return this.service.getViews(this.gridID!);
  }

  public createNewView(): void {
    const { view, config } = this.service.createNewView(this.gridID!);

    this.selectedView = view;
    this._columnConfig = this._columnConfig.map((column, index) => {
      const clonedColumn = {...column};
      const newColumn = config[index];

      return {...clonedColumn, ...newColumn};
    });
  }

  public removeCurrentView(): void {
    this.selectedView = this.service.removeView(this.gridID!, this.selectedView);
  }

  public viewIsDefault(): boolean {
    return this.selectedView === this.service.DEFAULT_KEY;
  }
}