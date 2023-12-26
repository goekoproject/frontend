import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BreadCrumbsFormatPipe } from './components/ui-breadcrumbs/ui-breadcrumb.pipe';
import { UiBreadcrumbsComponent } from './components/ui-breadcrumbs/ui-breadcrumbs.component';
import { PlaygroundUiBreadcrumbsComponent } from './playground-ui-breadcrumbs/playground-ui-breadcrumbs.component';
import { PlaygroundUiBreadcrumbsdetailsComponent } from './playground-ui-breadcrumbsdetails/playground-ui-breadcrumbsdetails.component';

@NgModule({
  declarations: [
    UiBreadcrumbsComponent,
    PlaygroundUiBreadcrumbsComponent,
    PlaygroundUiBreadcrumbsdetailsComponent,
    BreadCrumbsFormatPipe,
  ],
  exports: [UiBreadcrumbsComponent],
  imports: [CommonModule, RouterModule, TranslateModule],
})
export class UiBreadcrumbsModule {}
