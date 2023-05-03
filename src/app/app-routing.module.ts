import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinalformComponent } from './finalform/finalform.component';
import { SampleComponent } from './sample/sample.component';
import { InterceptorsComponent } from './interceptors/interceptors.component';
import { FilesizeComponent } from './filesize/filesize.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path:'',component:FinalformComponent
   },
     {
   path:'login',component:LoginComponent
  }
  // {
  //   path:'sample',component:SampleComponent
  // },
  // {
  //   path:'finalform',component:FinalformComponent
  // },
  // {
  //   path:'interceptors',component:InterceptorsComponent
  // },
  // {
  //   path:'filesize',component:FilesizeComponent
  // },
  // {
  //   path:'login',component:LoginComponent
  // },
  // {
  //   path:'register',component:RegisterComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
