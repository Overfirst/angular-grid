import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ApplicationsComponent } from "./grid-models/applications/applications.component";
import { ComputersComponent } from "./grid-models/computers/computers.component";
import { UsersComponent } from "./grid-models/users/users.component";

const routes: Routes = [
    {path: 'users', component: UsersComponent},
    {path: 'computers', component: ComputersComponent},
    {path: 'applications', component: ApplicationsComponent},
    {path: '**', redirectTo: '/users'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}