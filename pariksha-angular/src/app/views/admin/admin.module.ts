import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { CommonModule } from '@angular/common';
import { UpsertCategoryComponent } from './category/upsert-category/upsert-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { Role } from 'src/app/core/helpers/role.enum';
import { NgbPagination, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateQuizComponent } from './quizzes/update-quiz/update-quiz.component';


const routes : Routes = [
    {
        path : '',
        canActivate : [AuthGuard],
        component : AdminComponent,
        data : {role : [Role.ADMIN] },
        children : [
            { path : '', pathMatch : 'full', redirectTo : 'dashboard'},
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
                component : QuizzesComponent
            },
        ]
    },
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        NgbPagination,
        NgbTooltipModule
    ],
    exports: [],
    declarations: [
        DashboardComponent,
        CategoryComponent,
        QuizzesComponent,
        ManageUsersComponent,
        UpsertCategoryComponent,
        AdminComponent,
        UpdateQuizComponent
    ],
    providers: [],
})
export class AdminModule { }
