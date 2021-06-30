import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { GridColumn, GridFilter, GridFilterItem } from 'src/app/shared/interfaces';
import { orderBy, SortDescriptor, State } from "@progress/kendo-data-query";

@Component({
  selector: 'app-common-grid',
  templateUrl: './common-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonGridComponent {
  public gridData: GridDataResult;

  public _loading = false;
  public _columnConfig: GridColumn[] = [];

  public state: State = {
    skip: 0,
    take: 5,
  }

  private filterTemplate: GridFilter;

  @Input() public gridHeight = 900;
  @Input() public pageSize = 20;
  @Input() public sortable = true;
  @Input() public pageable: boolean | PagerSettings = true;
  @Input() public groupable = true;
  @Input() public reorderable = true;
  @Input() public resizable = true;
  @Input() public searchable = true;
  @Input() public sort: SortDescriptor[] = [];

  @Input() public set columnConfig(config: GridColumn[]) {
    if (config) {
      this._columnConfig  = config;

      this.filterTemplate = {
        filter: {
          logic: 'or',
          filters: [],
        },
      };
  
      this._columnConfig.map(column => column.alias).forEach(alias => {
        const item: GridFilterItem = {
          field: alias,
          operator: 'contains'
        };
      
        this.filterTemplate.filter.filters.push(item);
      });
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
}