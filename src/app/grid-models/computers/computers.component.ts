import { Component, ChangeDetectionStrategy } from '@angular/core';
import { COMPUTERS } from 'src/app/grid-models/computers/computers.collection'
import { Computer } from 'src/app/shared/interfaces'

@Component({
  selector: 'app-users',
  templateUrl: './computers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComputersComponent {
  public computers: Computer[] = COMPUTERS;
}