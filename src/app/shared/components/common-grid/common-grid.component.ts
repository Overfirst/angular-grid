import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { GridColumn } from 'src/app/shared/interfaces';
import { CompositeFilterDescriptor, orderBy, SortDescriptor, State, process } from '@progress/kendo-data-query';

@Component({
  selector: 'app-common-grid',
  templateUrl: './common-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonGridComponent {
  public gridData: GridDataResult;

  public _loading = false;
  public _columnConfig: GridColumn[] = [];

  public defaultFilter: CompositeFilterDescriptor = {
    logic: 'and',
    filters: [],
  };

  public state: State = {
    skip: 0,
    take: 5,
    filter: this.defaultFilter
  };

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

  @Input() public set columnConfig(config: GridColumn[]) {
    if (config) {
      this._columnConfig  = config;
    }
  } 

  @Input() public set loading(isLoading: boolean | null) {
    this._loading = isLoading !== null ? isLoading : false;
  }

  public nativeData: any[] = [];

  @Input() public set data(newData: GridDataResult | null) {
    if (newData) {
      this.gridData = newData;
      this.nativeData = newData.data;
    }
  }

  @Output() pageChanged = new EventEmitter<State>();
  // @Output() sortChanged
  // @Output() filterChanged

  public resolveDefault<T>(value: T | undefined, defaultValue: T): T {
    if (value === undefined) {
      return defaultValue;
    }

    return value;
  }

  public pageChange(state: State): void {
    this.state.skip = state.skip;
    this.state.take = state.take;
    this.pageChanged.emit(state);
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;

    this.gridData = {
      data: orderBy(this.nativeData, this.sort),
      total: this.gridData.total
    };
  }
  
  public filterChange(filter: CompositeFilterDescriptor): void {
    this.state.filter = filter;
    this.gridData = process(this.nativeData, this.state);
  }
}