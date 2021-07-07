import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AddEvent, RemoveEvent, SaveEvent } from '@progress/kendo-angular-grid';
import { BehaviorSubject } from 'rxjs';
import { Application, ColumnsConfig } from 'src/app/shared/interfaces'
import { ApplicationsService } from './applications.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationsComponent implements OnInit {
  public applications: Application[] = [];
  public applications$ = new BehaviorSubject<Application[]>([]);
  public loading$ = new BehaviorSubject<boolean>(false);

  public columnConfig: ColumnsConfig = [
    { alias: 'name', title: 'Name' },
    { alias: 'arch', title: 'Architecture' },
    { alias: 'vendor', title: 'Vendor' },
    { alias: 'size', title: 'Size', hidden: true },
  ];

  constructor(private service: ApplicationsService) {}

  public ngOnInit(): void {
    this.loading$.next(true);
    this.service.getApplications().subscribe((applications: Application[]) => {
      this.applications = applications;
      this.applications$.next(applications);
      this.loading$.next(false);
    });
  }

  public addApplication(event: AddEvent): void {
    this.applications = [event.dataItem, ...this.applications];
    this.applications$.next(this.applications);    
  }

  public editApplication(event: SaveEvent): void {
    const currentApplication: Application = event.dataItem;
    const editedApplication: Application = event.formGroup.value;

    this.applications = this.applications.map((application: Application) => application === currentApplication ? editedApplication : application);
    this.applications$.next(this.applications);
  }

  public removeApplication(event: RemoveEvent): void {
    this.applications = this.applications.filter((application: Application) => application !== event.dataItem);
    this.applications$.next(this.applications);
  }
}