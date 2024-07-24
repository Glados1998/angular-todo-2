import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {FeaturesModule} from './features/features.module';

@NgModule({ declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
        MatDialogModule,
        CoreModule,
        SharedModule,
        FeaturesModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
