import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { RemoteConfigService } from './remote-config.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    RemoteConfigService,
    provideRemoteConfig(() => getRemoteConfig()),

  ]
})
export class GoRemoteConfigModule {
}
