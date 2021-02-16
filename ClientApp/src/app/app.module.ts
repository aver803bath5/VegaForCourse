import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { APP_INITIALIZER, ErrorHandler, isDevMode, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import * as Sentry from "@sentry/angular";
import { Integrations } from "@sentry/tracing";

import { ToastrModule } from "ngx-toastr";

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { VehicleService } from "./services/vehicle.service";
import { AppErrorHandler } from "./app.error-handler.js";

if (!isDevMode()) {
  Sentry.init({
    dsn: "https://ce0bdcc5d423433d817050c8ebe352ac@o524403.ingest.sentry.io/5636826",
    integrations: [
      new Integrations.BrowserTracing({
        tracingOrigins: ["localhost:5001", "https://localhost:5001/api"],
        routingInstrumentation: Sentry.routingInstrumentation,
      }),
    ],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    VehicleFormComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'vehicles/new', component: VehicleFormComponent, pathMatch: 'full' },
      { path: 'vehicles/:id', component: VehicleFormComponent, pathMatch: 'full' },
    ])
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: true
      })
    },
    {
      provide: Sentry.TraceService,
      deps: [Router]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => { },
      deps: [Sentry.TraceService],
      multi: true,
    },
    VehicleService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
