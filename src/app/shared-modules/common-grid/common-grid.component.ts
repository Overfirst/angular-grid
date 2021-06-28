import { Component, ViewChild, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { DataBindingDirective, GridDataResult, PageChangeEvent, PagerSettings } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
import { GridColumn, GridFilter, GridFilterItem } from 'src/app/shared/interfaces';
import { State } from "@progress/kendo-data-query";

@Component({
  selector: 'app-common-grid',
  templateUrl: './common-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonGridComponent {
  public gridView: any[];
  public gridData: GridDataResult;
  public _loading = false;

  private filterTemplate: GridFilter;
  public _columnConfig: GridColumn[] = [];

  public state: State = {
    skip: 0,
    take: 5,
  } 

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
      })
    }
  } 

  @Input() public gridHeight = 900;
  @Input() public pageSize = 20;
  @Input() public sortable = true;
  @Input() public pageable: boolean | PagerSettings = true;
  @Input() public groupable = true;
  @Input() public reorderable = true;
  @Input() public resizable = true;
  @Input() public searchable = true;

  @Output() pageChanged = new EventEmitter<PageChangeEvent>();

  @Input() public set loading(isLoading: boolean | null) {
    this._loading = isLoading !== null ? isLoading : false;
  }

  @Input() public total = 0;

  @Input() public set data(newData: any[] | null) {
    if (!newData) {
      return;
    }

    this.gridData = { data: newData, total: this.total };
    // this.gridView = this.gridData.data;
  }

  public onFilter(event: any): void {
    // const inputValue: string = event.target.value;

    // this.filterTemplate.filter.filters.forEach(filter => filter.value = inputValue);
    // this.gridView = process(this.gridData.data, this.filterTemplate).data;
  }

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