import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { GridDataResult, PageChangeEvent, PagerSettings } from '@progress/kendo-angular-grid';
import { GridColumn } from '../../interfaces';
import { State } from "@progress/kendo-data-query";

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonTableComponent implements AfterViewInit {
  @ViewChild('textTemplate') public textTemplate: ElementRef;
  @ViewChild('booleanTemplate') public booleanTemplate: ElementRef;
  @ViewChild('dateTemplate') public dateTemplate: ElementRef;
  @ViewChild('listTemplate') public listTemplate: ElementRef;

  public state: State = {
    skip: 0,
    take: 5,
  }

  @Input() public total = 0;
  @Input() public gridHeight = 900;
  @Input() public pageSize = 20;
  @Input() public sortable = true;
  @Input() public pageable: boolean | PagerSettings = true;
  @Input() public groupable = true;
  @Input() public reorderable = true;
  @Input() public resizable = true;
  @Input() public searchable = true;

  public _columnConfig: GridColumn[] = [];

  @Input() public set columnConfig(config: GridColumn[]) {
    this._columnConfig = config;
  } 

  public _loading = false;
  @Input() public set loading(isLoading: boolean | null) {
    this._loading = isLoading !== null ? isLoading : false;
  }

  public gridData: GridDataResult = {data: [], total: 0};

  @Input() public set data(newData: any[] | null) {
    if (newData) {
      this.gridData = { data: newData, total: this.total };
    }
  }

  @Output() pageChanged = new EventEmitter<PageChangeEvent>();

  ngAfterViewInit() {
    if (!this._columnConfig) {
      return;
    }

    this._columnConfig.forEach(column => {
      switch(column.type) {
        case 'boolean':
          column.template = this.booleanTemplate;
          break;
        case 'date':
          column.template = this.dateTemplate;
          break;
        case 'list':
          column.template = this.listTemplate;
          break;
        default:
          column.template = this.textTemplate;
      }
    });
  }

  public pageChange(state: PageChangeEvent): void {
    this.state = state;
    this.pageChanged.emit(state);
  }
}
