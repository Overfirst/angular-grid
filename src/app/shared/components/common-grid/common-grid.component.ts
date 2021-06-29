import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { GridDataResult, PageChangeEvent, PagerSettings } from '@progress/kendo-angular-grid';
import { GridColumn, GridFilter, GridFilterItem } from 'src/app/shared/interfaces';
import { State } from "@progress/kendo-data-query";

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

  @Input() public set data(newData: GridDataResult | null) {
    if (newData) {
      this.gridData = newData;
    }
  }

  @Output() pageChanged = new EventEmitter<PageChangeEvent>();

  public resolveDefault<T>(value: T | undefined, defaultValue: T): T {
    if (value === undefined) {
      return defaultValue;
    }

    return value;
  }

  public pageChange(state: PageChangeEvent): void {
    this.state = state;
    this.pageChanged.emit(state);
  }
}