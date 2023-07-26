import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './views/Pages/dashboard/dashboard.component';
import { HomeComponent } from './views/Pages/home/home.component';
import { AboutComponent } from './views/Pages/about/about.component';
import { ContactComponent } from './views/Pages/contact/contact.component';
import { QuizAttemptsComponent } from './views/pages/quiz-attempts/quiz-attempts.component';
import { QuizComponent } from './views/pages/quiz/quiz.component';
import { Role } from './core/helpers/role.enum';

const routes : Routes = [
    {
      path :'',
      component : BaseComponent,
      children : [
        {
          path: 'home', 
          component : HomeComponent
        },
        {
          path: 'about', 
          component : AboutComponent
        },
        {
          path: 'contact', 
          component : ContactComponent
        },
        {
          path : 'dashboard',
          component : DashboardComponent,
          canActivate : [AuthGuard],
          data : {role : [Role.USER] }
        },
        {
          path : 'quizattemps',
          component : QuizAttemptsComponent,
          canActivate : [AuthGuard],
          data : {role : [Role.USER] }
        },
        {
          path : 'quiz/:id',
          component : QuizComponent,
          canActivate : [AuthGuard],
          data : {role : [Role.USER] }
        },
        { 
          path: '', redirectTo: 'home', pathMatch: 'full'
        }
      ]
    },
    {
      path : 'auth',
      loadChildren : () => import('./views/Pages/auth/auth.module').then(m => m.AuthModule)
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
