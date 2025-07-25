import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.route';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(withFetch()), provideAnimations(),importProvidersFrom(
      ExcelExportModule,
      PDFExportModule
    ), provideAnimationsAsync()]
};
