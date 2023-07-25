import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './views/layout/layout.module';
import { AuthGuard } from './core/guards/auth.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './core/helpers/token.interceptor';
import { AuthService } from './core/services/auth.service';
import { UnauthorizedComponent } from './views/unauthorized/unauthorized.component';
import { QuizAttemptsComponent } from './views/pages/quiz-attempts/quiz-attempts.component';

@NgModule({
  declarations: [
    AppComponent,
    UnauthorizedComponent,
    QuizAttemptsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
      deps: [AuthService],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
