import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './computers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComputersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
