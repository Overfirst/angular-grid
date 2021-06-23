import { Component, OnInit, ViewChild, ChangeDetectionStrategy, Input } from '@angular/core';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
import { GridFilter, GridFilterItem } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-common-grid',
  templateUrl: './common-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonGridComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;

  @Input() public gridName: string;
  @Input() public gridData: any[];

  public itemKeys: string[];
  public gridView: any[];

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
