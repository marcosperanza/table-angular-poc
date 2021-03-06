import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import {MenuComponent} from './menu/menu.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {TableComponent} from './table/table.component';
import {QueryService} from './query-service.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpMockQueryService} from './mock/http-mock-query.service';
import {FormatTimeValue} from './pipe/format-time-value.pipe';
import { TrackScrolDirective } from './directive/track-scrol.directive';
import {WebsocketService} from "./service/websocket.service";

const materialModules = [
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatInputModule,
  MatTooltipModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatProgressSpinnerModule
];

const pipes = [
  FormatTimeValue
];


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    TableComponent,
    pipes,
    TrackScrolDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    materialModules

  ],
  exports: [materialModules

  ],

  providers: [
    { provide: QueryService, useClass: HttpMockQueryService },
    { provide: WebsocketService, useClass: WebsocketService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
