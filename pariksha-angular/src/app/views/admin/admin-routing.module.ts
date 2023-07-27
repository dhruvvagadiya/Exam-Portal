import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Role } from 'src/app/core/helpers/role.enum';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { CategoryComponent } from './category/category.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { QuizComponent } from '../pages/quiz/quiz.component';
import { UpsertCategoryComponent } from './category/upsert-category/upsert-category.component';

const routes : Routes = [
    {
        path : '',
        canActivate : [AuthGuard],
        data : {role : [Role.ADMIN] },
        children : [
            {
                path : 'dashboard',
                component : DashboardComponent
            },
            {
                path : 'category',
                component : CategoryComponent
            },
            {
                path : 'upsert-category',
                component : UpsertCategoryComponent
            },
            {
                path : 'manage',
                component : ManageUsersComponent
            },
            {
                path : 'quiz',
                component : QuizComponent
            },
            { path : '', pathMatch : 'full', redirectTo : 'dashboard'}
        ]
    },
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
