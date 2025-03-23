import { inject, NgModule, provideAppInitializer } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtInterceptorInterceptor } from './shared/interceptors/jwt-interceptor.interceptor';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { AppSettingsService } from './shared/services/app-settings.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { LoginComponent } from './Login-Register/login/login.component';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './Login-Register/sign-up/sign-up.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    MatConfirmDialogComponent,
  ],
  imports: [
    BrowserAnimationsModule, // Required for toastr animations
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FooterModule,
    HeaderModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi(),withFetch()), // Registers HTTP Interceptors correctly

    provideAppInitializer(() => {
      //console.log("=======in provideAppInitializer");
      const appConfigService = inject(AppSettingsService);
      
      return  appConfigService.loadAppConfig();
    }),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorInterceptor,
      multi: true,
    },

    provideClientHydration(withEventReplay()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
