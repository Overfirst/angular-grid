import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComputersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
