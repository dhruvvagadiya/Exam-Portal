import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { CommonModule } from '@angular/common';
import { CategoryModalComponent } from './category/category-modal/category-modal.component';


@NgModule({
    imports: [
        AdminRoutingModule,
        CommonModule
    ],
    exports: [],
    declarations: [
        DashboardComponent,
        CategoryComponent,
        QuizzesComponent,
        ManageUsersComponent,
        CategoryModalComponent
    ],
    providers: [],
})
export class AdminModule { }
