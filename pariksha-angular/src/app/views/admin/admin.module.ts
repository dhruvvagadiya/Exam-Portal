import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { CommonModule } from '@angular/common';
import { UpsertCategoryComponent } from './category/upsert-category/upsert-category.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        AdminRoutingModule,
        CommonModule,
        FormsModule
    ],
    exports: [],
    declarations: [
        DashboardComponent,
        CategoryComponent,
        QuizzesComponent,
        ManageUsersComponent,
        UpsertCategoryComponent,
    ],
    providers: [],
})
export class AdminModule { }
