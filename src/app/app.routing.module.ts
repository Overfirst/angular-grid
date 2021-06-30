import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UsersComponent } from "./grid-models/users/users.component";
import { ComputersComponent } from "./grid-models/computers/computers.component";
import { ApplicationsComponent } from "./grid-models/applications/applications.component";
import { ProductsComponent } from "./grid-models/products/products.component";

const routes: Routes = [
    {path: 'users', component: UsersComponent},
    {path: 'computers', component: ComputersComponent},
    {path: 'applications', component: ApplicationsComponent},
    {path: 'products', component: ProductsComponent},
    {path: '**', redirectTo: '/users'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}