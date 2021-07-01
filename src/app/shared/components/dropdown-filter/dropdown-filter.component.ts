import { Component, Input } from '@angular/core';
import { FilterService, BaseFilterCellComponent, } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
})
export class DropDownListFilterComponent extends BaseFilterCellComponent {
  @Input() public filter: any;
  @Input() public data: any[];

  public textField: string = 'name';
  @Input() public valueField: string;

  constructor(filterService: FilterService) {
    super(filterService);
  }

  public get defaultItem(): any {
    return { name: 'Select item...' };
  }

  public get selectedValue(): any {
    const filter = this.filterByField(this.valueField);
    return filter ? filter.value : null;
  }

  private oldSelection: any = null;

  public selectionChange(selection: any): void {
    this.applyFilter(
        selection.name === this.defaultItem.name
        ? this.removeFilter(this.valueField)
        : this.updateFilter({
            field: this.valueField,
            operator: 'eq',
            value: selection.name,
          })
    );

    this.oldSelection = selection;
  }
}