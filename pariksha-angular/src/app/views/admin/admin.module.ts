import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';


@NgModule({
    imports: [
        AdminRoutingModule
    ],
    exports: [],
    declarations: [
        DashboardComponent,
        CategoryComponent,
        QuizzesComponent,
        ManageUsersComponent
    ],
    providers: [],
})
export class AdminModule { }
