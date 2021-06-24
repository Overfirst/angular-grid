import { Component, ChangeDetectionStrategy } from '@angular/core';
import { APPLICATIONS } from './applications.collection';
import { Application } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationsComponent {
  public applications: Application[] = APPLICATIONS;
}