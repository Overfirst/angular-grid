import { Component, ViewChild, ChangeDetectionStrategy, Input } from '@angular/core';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
import { DataGroup, GridColumn, GridFilter, GridFilterItem } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-common-grid',
  templateUrl: './common-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonGridComponent {
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;

  public gridView: any[] = [];
  public gridData: any[] = [];
  public columnConfig: GridColumn[] = [];
  public _loading = false;

  private filterTemplate: GridFilter;

  @Input() public gridHeight = 900;
  @Input() public pageSize = 20;
  @Input() public sortable = true;
  @Input() public pageable = true;
  @Input() public groupable = true;
  @Input() public reorderable = true;
  @Input() public resizable = true;
  @Input() public searchable = true;

  @Input() public set loading(isLoading: boolean | null) {
    this._loading = isLoading !== null ? isLoading : false;
  }

  @Input() public set allData(dataGroup: DataGroup | null) {
    if (!dataGroup) {
      return;
    }

    this.gridData = dataGroup.data;
    this.columnConfig = dataGroup.columnConfig;
    this.gridView = this.gridData;

    this.filterTemplate = {
      filter: {
        logic: 'or',
        filters: [],
      },
    };

    this.columnConfig.map(column => column.alias).forEach(alias => {
      const item: GridFilterItem = {
        field: alias,
        operator: 'contains'
      };
    
      this.filterTemplate.filter.filters.push(item);
    })
  }

  public onFilter(event: any): void {
    const inputValue: string = event.target.value;

    this.filterTemplate.filter.filters.forEach(filter => filter.value = inputValue);
    this.gridView = process(this.gridData, this.filterTemplate).data;
    this.dataBinding.skip = 0;
  }

  public resolveDefault<T>(value: T | undefined, defaultValue: T): T {
    if (value === undefined) {
      return defaultValue;
    }

    return value;
  }
}