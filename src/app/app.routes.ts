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
import { forbiddenGuard } from './guard/forbidden.guard';
import { GetRequestPrivateClassComponent } from './Pool/get-request-private-class/get-request-private-class.component';
import { RequestPrivateClassComponent } from './Pool/request-private-class/request-private-class.component';
import { SendRequestPrivateClassComponent } from './Pool/send-request-private-class/send-request-private-class.component';
import { CreatePrivateClassComponent } from './Pool/create-private-class/create-private-class.component';
import { UserPrivateClassesComponent } from './Pool/user-private-classes/user-private-classes.component';

export const routes: Routes = [
    {path : '' , component:WelcomeComponent},
    {path : 'auth' , component:AuthComponent , children:[
        {path : 'login' , component:LoginComponent , canActivate:[forbiddenGuard]},
        {path:'signup' , component:SignupComponent , canActivate:[forbiddenGuard]}
    ]},
    {path:'pools' , component:PoolComponent },
    {path: 'pools/:poolId/course', component: CourseComponent },
    {path:'profile' , component:ProfileComponent , canActivate:[authGuard]},
    {path:'teacher-form' , component:TeacherFormComponent , canActivate:[authGuard]},
    {path:'teacher' , component:TeacherListComponent},
    {path:'teacher/:teacherId/details' , component:TeacherDetailsComponent},
    {path:'teacher-form' , component:TeacherFormComponent , canActivate:[authGuard]},
    {path:'private-class',component:GetRequestPrivateClassComponent ,canActivate:[authGuard]},
    {path:'private-class/:privateId',component:RequestPrivateClassComponent ,canActivate:[authGuard]},
    {path:'request-class' , component:SendRequestPrivateClassComponent ,canActivate:[authGuard]},
    {path:'creat-private-class/:requestId', component:CreatePrivateClassComponent , canActivate:[authGuard]},
    {path:'my-private-class' , component:UserPrivateClassesComponent , canActivate:[authGuard]}
];
