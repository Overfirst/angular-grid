import { Component, OnInit, ViewChild, ChangeDetectionStrategy, Input } from '@angular/core';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
import { Column, GridFilter, GridFilterItem } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-common-grid',
  templateUrl: './common-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonGridComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;

  @Input() public gridData: any[] = [];
  @Input() public columnConfig: Column[] = [];

  @Input() public gridName: string = 'Unnamed';
  @Input() public gridHeight: number = 900;
  @Input() public pageSize: number = 20;
  @Input() public sortable: boolean = true;
  @Input() public pageable: boolean = true;
  @Input() public groupable: boolean = true;
  @Input() public reorderable: boolean = true;
  @Input() public resizable: boolean = true;
  @Input() public searchable: boolean = true;

  readonly defaultWidth: number = 300;

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

  public upFirstLetter(key: string) {
    const newKey = key[0].toUpperCase();
    return key.length > 1 ? newKey + key.substring(1) : newKey;
  }

  public onFilter(event: any): void {
    const inputValue: string = event.target.value;

    this.filterTemplate.filter.filters.forEach(filter => filter.value = inputValue);
    this.gridView = process(this.gridData, this.filterTemplate).data;
    this.dataBinding.skip = 0;
  }
}
