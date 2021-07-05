import { Component, ChangeDetectionStrategy, ViewChild, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { AddEvent, PagerSettings, RemoveEvent, SaveEvent } from '@progress/kendo-angular-grid';
import { GridColumn } from '../../interfaces';
import { SortDescriptor } from '@progress/kendo-data-query';
import { TemplateRef } from '@angular/core';

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonTableComponent implements AfterViewInit {
  @ViewChild('textTemplate') public textTemplate: TemplateRef<HTMLElement>;
  @ViewChild('booleanTemplate') public booleanTemplate: TemplateRef<HTMLElement>;
  @ViewChild('dateTemplate') public dateTemplate: TemplateRef<HTMLElement>;
  @ViewChild('listTemplate') public listTemplate: TemplateRef<HTMLElement>;

  @Input() public gridHeight = 900;
  @Input() public pageSize = 20;
  @Input() public sortable = true;
  @Input() public filterable = true;
  @Input() public pageable: boolean | PagerSettings = true;
  @Input() public groupable = true;
  @Input() public reorderable = true;
  @Input() public resizable = true;
  @Input() public searchable = true;
  @Input() public sort: SortDescriptor[] = [];

  @Input() public editable = false;
  @Input() public removable = false;
  @Input() public canCreate = false;
  @Input() public allowConfigurator = true;

  public _columnConfig: GridColumn[] = [];

  @Input() public set columnConfig(config: GridColumn[] | null) {
    if (config) {
      this._columnConfig = config;
      this.setColumnConfigTemplate();
    }
  } 

  public _loading = false;
  @Input() public set loading(isLoading: boolean | null) {
    this._loading = isLoading !== null ? isLoading : false;
  }

  public gridData: any[] = [];

  @Input() public set data(newData: any[] | null) {
    if (newData) {
      this.gridData = newData;
    }
  }

  @Output() public onItemEdit = new EventEmitter<SaveEvent>();
  @Output() public onItemRemove = new EventEmitter<RemoveEvent>();
  @Output() public onItemAdd = new EventEmitter<AddEvent>();

  public ngAfterViewInit(): void {
    this.setColumnConfigTemplate();
  }

  public setColumnConfigTemplate(): void {
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

  public editHandler(event: SaveEvent): void {
    this.onItemEdit.emit(event);
  }

  public addHandler(event: AddEvent): void {
    this.onItemAdd.emit(event);
  }
  
  public removeHandler(event: RemoveEvent): void {
    this.onItemRemove.emit(event);
  }
}
