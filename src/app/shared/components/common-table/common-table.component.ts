import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonTableComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
