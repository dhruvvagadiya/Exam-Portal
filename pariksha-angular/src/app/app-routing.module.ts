import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './views/Pages/dashboard/dashboard.component';

const routes : Routes = [
    {
      path : 'auth',
      loadChildren : () => import('./views/Pages/auth/auth.module').then(m => m.AuthModule)
    },
    {
      path :'',
      component : BaseComponent,
      canActivate : [AuthGuard],
      children : [
        {
          path: 'dashboard', 
          component : DashboardComponent
        },
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
      ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
