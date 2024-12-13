import { Routes } from '@angular/router';
import { PoolComponent } from './Pool/pool/pool.component';
import { AuthComponent } from './accounts/auth/auth.component';
import { LoginComponent } from './accounts/login/login.component';
import { SignupComponent } from './accounts/signup/signup.component';
import { WelcomeComponent } from './site/welcome/welcome.component';
import { adminGuard } from './guard/admin.guard';
import { ProfileComponent } from './accounts/profile/profile.component';
import { authGuard } from './guard/auth.guard';
import { CourseComponent } from './Pool/course/course.component';
import { TeacherFormComponent } from './accounts/teacher-form/teacher-form.component';
import { TeacherListComponent } from './Teacher/teacher-list/teacher-list.component';
import { TeacherDetailsComponent } from './Teacher/teacher-details/teacher-details.component';

export const routes: Routes = [
    {path : '' , component:WelcomeComponent},
    {path : 'auth' , component:AuthComponent , children:[
        {path : 'login' , component:LoginComponent  },
        {path:'signup' , component:SignupComponent}
    ]},
    {path:'pools' , component:PoolComponent },
    {path: 'pools/:poolId/course', component: CourseComponent },
    {path:'profile' , component:ProfileComponent , canActivate:[authGuard]},
    {path:'teacher-form' , component:TeacherFormComponent , canActivate:[authGuard]},
    {path:'teacher' , component:TeacherListComponent},
    {path:'teacher/:teacherId/details' , component:TeacherDetailsComponent}
];
