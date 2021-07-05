import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { GridColumn } from '../../interfaces';

@Component({
  selector: 'app-common-grid-configurator',
  templateUrl: './common-grid-configurator.component.html',
  styleUrls: ['./common-grid-configurator.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonGridConfiguratorComponent {
  public _columnConfig: GridColumn[];
  public form: FormGroup;

  @Input() public set columnConfig(config: GridColumn[]) {
    this._columnConfig = config;
    
    const controls: { [key: string]: FormControl } = {};

    this._columnConfig.forEach((column: GridColumn) => {
      controls[column.alias] = new FormControl(column.width || 100, [Validators.required, Validators.min(10)]);
    });

    this.form = new FormGroup(controls);
  }

  @Output() public onClose = new EventEmitter<void>();

  public resolveDefault<T>(value: T | undefined, defaultValue: T): T {
    if (value === undefined) {
      return defaultValue;
    }

    return value;
  }

  public checkBoxChanged(column: GridColumn, property: string) {
    console.log('textBoxChanged:', column, property);
  }

  public getControl(column: GridColumn): FormControl {
    return this.form.controls[column.alias] as FormControl;
  }

  public closeClicked(): void {
    this.onClose.emit();
  }
}