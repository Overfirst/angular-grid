import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AddEvent, RemoveEvent, SaveEvent } from '@progress/kendo-angular-grid';
import { BehaviorSubject } from 'rxjs';
import { GridColumn, User } from 'src/app/shared/interfaces'
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChild('ratingTemplate') ratingTemplate: TemplateRef<HTMLElement>; 

  public columnConfig: GridColumn[] = [
    { alias: 'name', title: 'Name' },
    { alias: 'surname', title: 'Surname' },
    {
      alias: 'email',
      title: 'Email',
      width: 350,
      validators: [Validators.email]
    },
    { alias: 'avatar', title: 'Avatar', hidden: true },
    {
      alias: 'rating',
      title: 'Rating',
      validators: [Validators.min(0), Validators.max(10)]
    },
  ];

  public users: User[] = [];
  public users$ = new BehaviorSubject<User[]>([]);
  public loading$ = new BehaviorSubject<boolean>(false);

  constructor(private service: UsersService) {}

  public ngOnInit(): void {
    this.loading$.next(true);
    this.service.getUsers().subscribe((users: User[]) => {
      this.users = users;
      this.users$.next(users);
      this.loading$.next(false);
    });
  }

  public ngAfterViewInit(): void {
    const ratingColumn = this.columnConfig.find(column => column.alias === 'rating');

    // todo: immutable
    if (ratingColumn) {
      ratingColumn.customTemplate = this.ratingTemplate
    }
  }

  public addUser(event: AddEvent): void {
    this.users = [event.dataItem, ...this.users];
    this.users$.next(this.users);    
  }

  public editUser(event: SaveEvent): void {
    const currentUser: User = event.dataItem;
    const editedUser: User = event.formGroup.value;

    this.users = this.users.map((user: User) => user === currentUser ? editedUser : user);
    this.users$.next(this.users);
  }

  public removeUser(event: RemoveEvent): void {
    this.users = this.users.filter((user: User) => user !== event.dataItem);
    this.users$.next(this.users);
  }
}