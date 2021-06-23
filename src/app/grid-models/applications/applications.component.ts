import { Component, ChangeDetectionStrategy } from '@angular/core';
import { APPLICATIONS } from './applications.collection';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationsComponent {
  public applications: any[] = APPLICATIONS;
}