import { Component, ChangeDetectionStrategy } from '@angular/core';
import { COMPUTERS } from 'src/app/grid-models/computers/computers.collection'

@Component({
  selector: 'app-users',
  templateUrl: './computers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComputersComponent {
  public computers: any[] = COMPUTERS;
}