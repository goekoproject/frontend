import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRouteModule } from './home.routes';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule,HomeRouteModule],
})
export class HomeModule {}
