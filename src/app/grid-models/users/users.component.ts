import { Component, ChangeDetectionStrategy } from '@angular/core';
import { USERS } from 'src/app/grid-models/users/users.collection'
import { User, GridColumn } from 'src/app/shared/interfaces'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  public users: User[] = USERS;
  public columnConfig: GridColumn[] = [
    { title: "Name", width: 300 },
    { title: "Surname", width: 300 },
    { title: "Email", width: 600 },
    { title: "Avatar", hidden: true },
  ];
}