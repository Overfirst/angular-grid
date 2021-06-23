import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { process } from "@progress/kendo-data-query";
import { users } from "./users.collection";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridData: any[] = users;
  public gridView: any[];

  public ngOnInit(): void {
    this.gridView = this.gridData;
  }

  public onFilter(event: any): void {
    const inputValue: string = event.target.value;

    this.gridView = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "name",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "surname",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "email",
            operator: "contains",
            value: inputValue,
          },
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }
}
