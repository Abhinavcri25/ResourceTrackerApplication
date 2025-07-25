/// <reference types="@angular/localize" />
import '@angular/localize/init';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
