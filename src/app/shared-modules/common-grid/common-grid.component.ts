import { Component, OnInit, ViewChild, ChangeDetectionStrategy, Input } from '@angular/core';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
import { GridColumn, GridFilter, GridFilterItem } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-common-grid',
  templateUrl: './common-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonGridComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;

  @Input() public gridData: any[] = [];
  @Input() public columnConfig: GridColumn[] = [];

  @Input() public gridHeight = 900;
  @Input() public pageSize = 20;
  @Input() public sortable = true;
  @Input() public pageable = true;
  @Input() public groupable = true;
  @Input() public reorderable = true;
  @Input() public resizable = true;
  @Input() public searchable = true;

  public itemKeys: string[] = [];
  public gridView: any[] = [];

  private filterTemplate: GridFilter;

  public ngOnInit(): void {
    this.gridView = this.gridData;
    this.itemKeys = Object.keys(this.gridData[0]);

    this.filterTemplate = {
      filter: {
        logic: 'or',
        filters: [],
      },
    };

    this.itemKeys.forEach(key => {
      const item: GridFilterItem = {
        field: key,
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

  public paramFromConfig<T>(idx: number, param: string, defaultValue: T): T {
    const configItem: any = this.columnConfig[idx];
    return configItem && configItem[param] || defaultValue;
  }

  public resolveDefault<T>(value: T | undefined, defaultValue: T): T {
    if (value === undefined) {
      return defaultValue;
    }

    return value;
  }
}