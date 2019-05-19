import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/header/header.component';
import { MapComponent } from './shared/map/map.component';
import { ControlPanelComponent } from './shared/control-panel/control-panel.component';

import { AgmCoreModule } from '@agm/core';
import { UserComponent } from './frames/user/user.component';
import { SupervisorComponent } from './frames/supervisor/supervisor.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapComponent,
    ControlPanelComponent,
    UserComponent,
    SupervisorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAEaJt6IEdsyHLkwhDHqKHTpI5Wb8oZj1M'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
