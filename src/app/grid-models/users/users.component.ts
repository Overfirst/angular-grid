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
    { alias: 'name', title: "Name", width: 300 },
    { alias: 'surname', title: "Surname", width: 300 },
    { alias: 'email', title: "Email", width: 600 },
    { alias: 'avatar', title: "Avatar", hidden: true },
  ];
}