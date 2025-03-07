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
import { onlyTeacherGuard } from './guard/only-teacher.guard';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { NotFoundComponent } from './site/not-found/not-found.component';
import { AccessDeniedComponent } from './site/access-denied/access-denied.component';
import { CourseRegisterComponent } from './Pool/course-register/course-register.component';
import { FAQComponent } from './FAQ/faq/faq.component';
import { AboutUsComponent } from './aboutUs/about-us/about-us.component';

export const routes: Routes = [
    {path :'', component:WelcomeComponent},
    {path:'about-us' , component : AboutUsComponent} , 
    {path:'FAQ' , component : FAQComponent} ,
    {path : 'auth' , component:AuthComponent , children:[
        {path : 'login' , component:LoginComponent , canActivate:[forbiddenGuard]},
        {path:'signup' , component:SignupComponent , canActivate:[forbiddenGuard]}, 
        {path:'forgetPassword' , component:ForgetPasswordComponent , canActivate:[forbiddenGuard]}
    ]},
    {path:'pools' , component:PoolComponent },
    {path: 'pools/:poolId/course', component: CourseComponent },
    {path:'pools/:poolId/course/:courseId' , component:CourseRegisterComponent},
    {path:'profile' , component:ProfileComponent , canActivate:[authGuard]},
    {path:'teacher-form' , component:TeacherFormComponent , canActivate:[authGuard]},
    {path:'teacher' , component:TeacherListComponent},
    {path:'teacher/:teacherId/details' , component:TeacherDetailsComponent},
    {path:'teacher-form' , component:TeacherFormComponent , canActivate:[authGuard]},
    {path:'private-class',component:GetRequestPrivateClassComponent ,canActivate:[authGuard]},
    {path:'private-class/:privateId',component:RequestPrivateClassComponent ,canActivate:[authGuard]},
    {path:'request-class' , component:SendRequestPrivateClassComponent ,canActivate:[authGuard]},
    {path:'create-private-class/:requestId', component:CreatePrivateClassComponent , canActivate:[authGuard , onlyTeacherGuard]},
    {path:'my-private-class' , component:UserPrivateClassesComponent , canActivate:[authGuard]} ,
    {path : 'access-denied' , component : AccessDeniedComponent }, 
    {path : 'not-found' , component : NotFoundComponent },
    {path: '**', redirectTo:'/not-found'}
   
];
