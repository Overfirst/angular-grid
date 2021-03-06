import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { SharedModule } from './shared/shared.module'

import { UsersModule } from './grid-models/users/users.module';
import { ComputersModule } from './grid-models/computers/computers.module';
import { ApplicationsModule } from './grid-models/applications/applications.module';
import { ProductsModule } from './grid-models/products/products.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    UsersModule,
    ComputersModule,
    ApplicationsModule,
    ProductsModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}