import { Component, ChangeDetectionStrategy } from '@angular/core';
import { USERS } from 'src/app/grid-models/users/users.collection'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  public users: any[] = USERS;
}