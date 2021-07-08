import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { AddEvent, CancelEvent, ColumnReorderEvent, ColumnResizeArgs, EditEvent, GridComponent, PageChangeEvent, PagerSettings, RemoveEvent, SaveEvent } from '@progress/kendo-angular-grid';
import { ColumnsConfig, GridColumn, GridView } from 'src/app/shared/interfaces';
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
export class CommonGridComponent implements OnInit, OnDestroy {
  private _loading = false;
  private _columnConfig: ColumnsConfig = [];
  private _view: GridView;

  public gridData: any[];

  public formGroup: FormGroup;
  public configuratorOpened = false;
  public nowEdits = false;
  public editedRowIndex = 0;

  public set view(view: GridView) {
    this._view = view;
    this.columnConfig = this.columnConfig.map((col, idx) => ({...col, ...view.config[idx]}));
    this.filter = view.filter;
    this.sort = view.sort;
    this.pageSize = view.pageSize;
  }

  public get view() {
    return this._view;
  }

  public get columnConfig() {
    return this._columnConfig;
  }

  public get loading() {
    return this._loading;
  }

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

  @Input() public filter: CompositeFilterDescriptor = {
    logic: 'and',
    filters: [],
  };

  @Input() public pageable: boolean | PagerSettings = true;
  @Input() public gridID: string | null = null;

  @Input() public set columnConfig(config: ColumnsConfig) {
    this._columnConfig = config;

    this.columnConfig.forEach(column => {
      if (!column.validators) {
        column.validators = [];
      }

      if (!column.validators.includes(Validators.required)) {
        column.validators.push(Validators.required);
      }

      column.width = this.resolveDefault(column.width, 350);
      column.hidden = this.resolveDefault(column.hidden, false);
      column.locked = this.resolveDefault(column.locked, false);
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
    if (this.gridID === null) {
      return;
    }

    this.service.waitInitView(this.gridID!).subscribe(can => {
      if (can) {
        this.view = this.service.createDefaultView(this.gridID!, {
          name: this.service.DEFAULT_VIEW_NAME,
          config: this.columnConfig,
          sort: this.sort,
          filter: this.filter,
          pageSize: this.pageSize
        });

        const selectedView = this.service.getSelectedView(this.gridID!);
        if (selectedView) {
          this.view = this.service.getView(this.gridID!, selectedView);
        }
      }
    })
  }

  public ngOnDestroy(): void {
    if (this.gridID) {
      this.service.canInitView(this.gridID, false)
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

    this.columnConfig.forEach((column: GridColumn) =>
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

    this.columnConfig.forEach((column: GridColumn) => {
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
      const needColumn = this.columnConfig.find(col => col.alias === column.field);

      if (needColumn) {
        needColumn.width = newWidths[index];
      }
    });

    this.updateCurrentView();
  }

  public filterChange(filter: CompositeFilterDescriptor): void {
    this.filter = filter;
    this.updateCurrentView();
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.updateCurrentView();
  }

  public pageChange(event: PageChangeEvent): void {
    this.pageSize = event.take;
    this.updateCurrentView();
  }

  public columnReorder(event: ColumnReorderEvent): any {
    const newIdx = event.newIndex;
    const oldIdx = event.oldIndex;
    
    const column = this.columnConfig[oldIdx];

    this.columnConfig.splice(oldIdx, 1);
    this.columnConfig.splice(oldIdx < newIdx ? newIdx + 1 : newIdx, 0, column);

    this.updateCurrentView();
  }

  public closeEditor(grid: GridComponent, rowIndex: number = this.editedRowIndex): void {
    grid.closeRow(rowIndex);
    this.editedRowIndex = -1;
  }

  public viewSelectionChanged(viewName: string): void {
    this.view = this.service.getView(this.gridID!, viewName);
  }

  public getViews(): string[] {
    return this.service.getViewsList(this.gridID!);
  }

  public createNewView(): void {
    this.view = this.service.createView(this.gridID!);
  }

  public viewCheckboxChanged(event: Event): void {
    this.updateCurrentView();
  }

  public removeCurrentView(): void {
    // this.selectedView = this.service.removeView(this.gridID!, this.selectedView);
  }

  public viewIsDefault(): boolean {
    return this.view && this.view.name === this.service.DEFAULT_VIEW_NAME;
  }

  public updateCurrentView(): void {
    this.view = this.service.updateView(this.gridID!, {
      name: this.view.name,
      config: this.columnConfig,
      filter: this.filter,
      sort: this.sort,
      pageSize: this.pageSize
    });
  }
}